<Modal title="Duplicate Clip" subtitle={clip.slug} bind:open loading={!sequences.length} {saving}>
	{#if sequences.length}
		<Input label="Slug" sublabel="This field will display in the navigation." bind:value={slug} required={true} autofocus={true}/>
		<Select label="Parent Sequence" bind:value={parent_id} required={true} {options}/>
		{#if parent}
			<Input type="number" label="Order" prelabel="{parent.order}-" bind:value={order} required={true}/>
		{/if}
		<Errors {errors}/>
		<Button title="Save" classes="good" handler={save}/>
	{/if}
</Modal>

<script>
	export let sequence
	export let clip
	export let open
	let sequences = []
	$: options = sequences.map(seq => ({ id: seq.id, text: seq.slug }))
	let slug = ''
	let parent_id = ''
	$: parent = parent_id ? sequences.find(seq => seq.id === parent_id) : undefined
	let order = 0

	import Input from '../../components/elements/Input.svelte'
	import Select from '../../components/elements/Select.svelte'
	import Button from '../../components/elements/Button.svelte'
	import Modal from '../../components/widgets/Modal.svelte'
	import Errors from '../../components/widgets/Errors.svelte'

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session } = get_sapper_stores()
	import { POST } from '../../../../utils/loaders.js'

	let validator
	(async() => {
		const res = await POST('/api/admin/stories/sequences-list.post', {
			cookie: $session.cookie,
			story_id: 'ck63z9yk8mjk90904fj1gsnlf',
		})
		sequences = res.sequences
		parent_id = sequence.id

		const { default: FastestValidator } = await import('fastest-validator')
		validator = (new FastestValidator()).compile({
			slug: 'string|empty:false|min:3|max:250',
			parent: 'string',
			order: 'number|integer|min:0|max:9999',
			$$strict: true,
		})
	})()

	let errors = []
	let saving = false
	async function save() {
		saving = true
		const valid = validator({ slug, parent: parent ? parent.id : false, order })
		if (valid !== true) {
			errors = valid
			return
		}
		errors = []

		const res = await POST('/api/admin/stories/clip-duplicate.post', {
			cookie: $session.cookie,
			clip,
			slug,
			parent_id: parent.id,
			order: `${parent.order}-${order}`,
		})
		// console.log(res)
		sequence.clips = [...sequence.clips, res.created_clip].sort((one, two) => two.id.localeCompare(one.id))

		saving = false
		open = false
	}
</script>

<!-- <style type="text/scss"></style> -->
