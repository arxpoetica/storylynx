<div class="layout-main">
	<h1>Posts</h1>
	<slot name="pre-content"></slot>
	{#if items.length}
		<div class="post-items">
			{#each items as item}
				<PostItem {item}/>
			{/each}
		</div>
		{#if next_batch}
			<div class="wrap">
				<button class="button" on:click={() => load_content()}>Load More</button>
			</div>
		{/if}
	{:else}
		<h2>Loading . . .</h2>
	{/if}
	<slot name="post-content"></slot>
</div>

<script>
	export let items
	export let next_batch
	export let batch_size

	import { POST } from '../../utils/loaders.js'
	import PostItem from './PostItem.svelte'

	let batch = 1
	async function load_content() {
		batch += 1
		const params = new URLSearchParams(window.location.search)

		const res = await POST('/api/public/posts/batch.post', Object.assign({
			batch,
			batch_size,
		}, Object.fromEntries(params)))

		items = [...items, ...res.items]
		next_batch = res.next_batch
	}
</script>

<style type="text/scss">
	.post-items {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0 0 40rem;
	}
	@media (--large-to-medium) {
		.post-items {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (--small-down) {
		.post-items {
			display: block;
		}
	}
	.wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 0 20rem;
	}
	.button {
		margin: 0;
	}
</style>
