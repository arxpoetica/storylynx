<Modal title="Duplicate Clip" subtitle={clip.slug} bind:open loaded={!!sequences.length}>
	{#if sequences.length}
		<Input label="Slug" sublabel="This field will display in the navigation." bind:value={slug} required={true} autofocus={true}/>
		<Select label="Parent Sequence" bind:value={index} primary="Select One" required={true} {options}/>
		{#if sequence}
			<Input type="number" label="Order" prelabel="{sequence.order}-" bind:value={order} required={true}/>
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
			slug: 'string|empty:false|min:3|max:250',
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

<!-- <style type="text/scss"></style> -->
