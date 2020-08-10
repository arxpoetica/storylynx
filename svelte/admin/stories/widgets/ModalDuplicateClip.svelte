<Modal title="Duplicate Clip" subtitle="&quot;{clip.slug}&quot;" bind:open loaded={!!sequences.length}>
	{#if sequences.length}
		<Input label="Slug" sublabel="(alphanumberic-kebab-case)" bind:value={slug} required={true} autofocus={true}/>
		<Select label="Parent Sequence" bind:value={index} primary="Select One" required={true} {options}/>
		{#if sequence}
			<div class="order">
				<div class="col one">{sequence.order}-</div>
				<div class="col">
					<Input type="number" label="Order" sublabel="(number)" bind:value={order} required={true}/>
					<!-- <input type="number" bind:value={order} placeholder="Give the duplicate clip an order..."/> -->
				</div>
			</div>
		{/if}
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

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session } = get_sapper_stores()
	import { POST } from '../../../../utils/loaders.js'

	(async() => {
		const res = await POST('/api/admin/stories/sequences-list.post', {
			cookie: $session.cookie,
			story_id: 'ck63z9yk8mjk90904fj1gsnlf',
		})
		sequences = res.sequences
	})()

	import Input from '../../components/elements/Input.svelte'
	import Select from '../../components/elements/Select.svelte'
	import Button from '../../components/elements/Button.svelte'
	import Modal from '../../components/widgets/Modal.svelte'

	async function save(index) {
		// $saving = true

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
