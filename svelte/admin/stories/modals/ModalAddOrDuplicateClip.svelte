<Modal
	title={ask ? `Jump to the "${jump_seq.title}" sequence containing the new "${new_clip.slug}" clip?` : `${type} Clip`}
	subtitle={type === 'Duplicate' ? (ask ? '' : clip.slug) : ''}
	bind:open
	loading={!sequences.length}
	{saving}
>
	{#if ask}
		<Button
			label="Yes, take me there!"
			classes="good"
			href="/admin/stories/{$seq.story.id}/{jump_seq.id}"
			handler={() => open = false}
		/>
		<Button label="No thanks." classes="plain" handler={() => open = false}/>
	{:else if sequences.length}
		<div class="contents rows">
			<div class="row">
				<Input label="Title" sublabel="This field will display in the navigation." bind:value={slug} required={true} autofocus={true}/>
			</div>
			<div class="row">
				<Select
					label="Sequence"
					bind:value={parent_id}
					primary={false}
					required={true}
					options={seq_options}
					on:change={() => prior_clip_id = ''}
				/>
			</div>
			<div class="row">
				<Select
					label="Clip Position"
					sublabel="Select a clip to place the {type.toLowerCase()} clip after."
					bind:value={prior_clip_id}
					required={true}
					options={clip_options}
				/>
			</div>
			<div class="row">
				<Errors {errors}/>
				<Button label="Save" classes="good" handler={save}/>
			</div>
		</div>
	{/if}
</Modal>

<script>
	import { seq } from '../../../../stores/admin-store.js'

	export let clip
	export let open
	export let type

	let ask
	let new_clip
	let jump_seq
	let sequences = []
	let slug = ''
	let parent_id = ''
	$: parent = parent_id ? sequences.find(seq => seq.id === parent_id) : undefined
	let prior_clip_id = ''
	$: seq_options = sequences.map(seq => ({ id: seq.id, text: seq.title ? `${seq.title} (${seq.slug})` : seq.slug }))
	$: clip_options = (sequences.find(seq => seq.id === parent_id) || { clips: [] }).clips
		.map(clip => ({ id: clip.id, text: clip.slug || `Clip ${clip.order}` }))

	import Input from '../../components/elements/Input.svelte'
	import Select from '../../components/elements/Select.svelte'
	import Button from '../../components/elements/Button.svelte'
	import Modal from '../../components/widgets/Modal.svelte'
	import Errors from '../../components/widgets/Errors.svelte'

	import { POST } from '../../../../utils/loaders.js'
	import { get_unknown_order, get_order_mid_distance } from '../../../../utils/story-utils.js'

	let validator
	(async() => {
		const res = await POST('/api/admin/stories/sequences-list.post', { story_id: $seq.story.id })
		parent_id = $seq.id
		prior_clip_id = clip.id
		sequences = res.sequences

		const { default: FastestValidator } = await import('fastest-validator')
		validator = (new FastestValidator()).compile({
			'Title': 'string|empty:false|min:3|max:250',
			'Sequence': 'string|empty:false',
			'Clip Order': 'string|empty:false',
			$$strict: true,
		})
	})()

	let errors = []
	let saving = false
	async function save() {
		saving = true
		const valid = validator({
			'Title': slug,
			'Sequence': parent ? parent.id : false,
			'Clip Order': prior_clip_id,
		})
		if (valid !== true) {
			errors = valid
			saving = false
			return
		}
		errors = []

		jump_seq = sequences.find(seq => seq.id === parent.id)
		const jump_clip_index = jump_seq.clips.findIndex(clip => clip.id === prior_clip_id)
		const jump_clip_prev = jump_seq.clips[jump_clip_index]
		const jump_clip_next = jump_seq.clips[jump_clip_index + 1]
		const prev_order = jump_clip_prev.order

		let insertion_order
		let clip_changes = []
		const next_order = jump_clip_next ? jump_clip_next.order : get_unknown_order(prev_order)
		const order_mid_distance = get_order_mid_distance(prev_order, next_order)
		if (order_mid_distance < 1) {
			// need to reorder all the items
			clip_changes = jump_seq.clips.map(({ id }, index) => {
				if (index <= jump_clip_index) {
					if (index === jump_clip_index) {
						insertion_order = (index + 2) * 10000
					}
					return { id, order: (index + 1) * 10000 }
				}
				return { id, order: (index + 2) * 10000 }
			}).filter(Boolean)
		} else {
			// just set the new duplicate clip order
			insertion_order = prev_order + order_mid_distance
		}

		if (clip_changes.length) {
			const res = await POST('/api/admin/stories/clips-reorder.post', { clip_changes })
			if (res.error) {
				alert('Something went wrong. The clip could not be duplicated. Please contact the administrator of this site for assistance.')
				saving = false
				open = false
				return false
			}
		}

		const res = await POST('/api/admin/stories/clip-create.post', {
			clip: Object.assign({ parent_name: jump_seq.order }, clip),
			slug,
			parent_id: parent.id,
			order: insertion_order,
		})
		new_clip = res.created_clip

		saving = false
		if (jump_seq.id === $seq.id) {
			// just reorder the clips
			$seq.clips = $seq.clips.map(clip => {
				const found = clip_changes.find(change => change.id === clip.id)
				if (found) { clip.order = found.order }
				return clip
			})
			$seq.clips = [...$seq.clips, new_clip].sort((one, two) => one.order - two.order)
			open = false
		} else {
			ask = true
		}
	}
</script>

<style type="text/scss">
	.contents :global(select) {
		max-width: 370rem;
	}
</style>
