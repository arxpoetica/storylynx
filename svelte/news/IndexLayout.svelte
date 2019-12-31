<div class="layout-main">
	<h1>News</h1>
	<slot name="pre-content"></slot>
	{#if items.length}
		<div class="news-items">
			{#each items as item}
				<NewsItem {item}/>
			{/each}
		</div>
		{#if items_count > page_size}
			<Pagination href="/news" {page} {page_size} {items_count}/>
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

	import NewsItem from './NewsItem.svelte'
	import Pagination from '../page-lists/Pagination.svelte'

	export let items = []
	export let items_count = 0
	export let page_size = 0
	$: page = parseInt($pageStore.query.page)
</script>

<style type="text/scss">
	.news-items {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0 0 40rem;
	}
	@media (--large-to-medium) {
		.news-items {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (--small-down) {
		.news-items {
			display: block;
		}
	}
</style>
