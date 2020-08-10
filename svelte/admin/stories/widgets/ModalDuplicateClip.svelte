<Modal title="Duplicate Clip" subtitle="&quot;{clip.slug}&quot;" bind:open loaded={!!sequences.length}>
	{#if sequences.length}
		<Input label="Slug" sublabel="(alphanumberic-kebab-case)" bind:value={slug} required={true} autofocus={true}/>
		<Select label="Parent Sequence" bind:value={index} primary="Select One" required={true} {options}/>
		{#if sequence}
			<div class="order">
				<div class="col one">{sequence.order}-</div>
				<div class="col">
					<Input type="number" label="Order" sublabel="(number)" bind:value={order} required={true}/>
				</div>
			</div>
		{/if}
		<Errors {errors}/>
		<Button title="Save" classes="good" handler={save}/>
	{/if}
</Modal>

<script>
	export let clip
	export let open
	let sequences = []
	$: options = sequences.map(seq => ({ id: seq.id, text: seq.slug }))
	let slug = ''
	let index = ''
	$: sequence = typeof index === 'number' ? sequences[index] : undefined
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

		const { default: FastestValidator } = await import('fastest-validator/dist/index.min.js')
		validator = (new FastestValidator()).compile({
			slug: {
				type: 'string',
				pattern: /^\b[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\b$/,
			},
			parent: 'string',
			order: 'number|integer|min:0|max:9999',
			$$strict: true,
		})
	})()

	let errors = []
	async function save(index) {
		// $saving = true

		const valid = validator({ slug, parent: sequence ? sequence.id : false, order })
		if (valid !== true) {
			errors = valid
			return
		}
		errors = []

		// <!-- slug, order, parent_id -->

		// const res = await POST('/api/admin/stories/clip-duplicate.post', {
		// 	cookie: $session.cookie,
		// 	clip: sequence.clips[index],
		// })
		// // console.log(res.mutation)
		// // console.log(res.variables)
		// console.log(res)

		// $saving = false
		open = false
	}
</script>

<style type="text/scss">
	.order {
		display: flex;
	}
	.one {
		padding-top: 29rem;
		font: 14rem/20rem var(--admin-font);
	}
</style>
