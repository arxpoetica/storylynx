<div class="layout-main">
	<h1>Posts</h1>
	<slot name="pre-content"></slot>
	{#if items.length}
		<div class="post-items">
			{#each items as item}
				<PostItem {item}/>
			{/each}
		</div>
		{#if items_count > page_size}
			<!-- FIXME: we have to figure out what to do about pagination now... -->
			<Pagination href="/posts" {page} {page_size} {items_count}/>
		{/if}
	{:else}
		<h2>Loading . . .</h2>
	{/if}
	<slot name="post-content"></slot>
</div>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page: pageStore } = get_sapper_stores()

	import PostItem from './PostItem.svelte'
	import Pagination from '../page-lists/Pagination.svelte'

	export let items = []
	export let items_count = 0
	export let page_size = 0
	$: page = parseInt($pageStore.query.page)
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
</style>
