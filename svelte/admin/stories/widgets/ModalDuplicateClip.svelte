<Modal title="Duplicating clip: &quot;{clip.slug}&quot;" bind:open>

	<!-- slug, order, parent_id -->

	{#if sequences && sequences.length}
		<input type="text" bind:value={slug} placeholder="Give the duplicate clip a slug..."/>
		<select bind:value={sequence}>
			<option value="">Select an parent sequence for the clip</option>
			{#each sequences as sequence, index (sequence.order)}
				<option value={sequences[index]}>{sequence.slug}</option>
			{/each}
		</select>
		{#if sequence}
			{sequence.order}-
			<input type="number" bind:value={order} placeholder="Give the duplicate clip an order..."/>
		{/if}
		<Button title="Save" classes="good" handler={save}/>
	{/if}
</Modal>

<script>
	export let clip
	export let open
	let sequences
	let slug = ''
	let sequence = ''
	let order = 0

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session } = get_sapper_stores()
	import { POST } from '../../../../utils/loaders.js'

	(async() => {
		console.log('how many times is this happening???')
		const res = await POST('/api/admin/stories/sequences-list.post', {
			cookie: $session.cookie,
			story_id: 'ck63z9yk8mjk90904fj1gsnlf',
		})
		console.log(res.sequences)
		sequences = res.sequences
	})()

	import Button from '../../components/elements/Button.svelte'
	import Modal from '../../components/widgets/Modal.svelte'

	async function save(index) {
		// $saving = true

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
	input,
	select {
		color: black;
	}
</style>
