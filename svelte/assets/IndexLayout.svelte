<div class="layout-main">
	<AssetsToolbar
		bind:contentValue
		bind:decadeValue
		bind:subjectValue
		on:filter={filter}
		{content_types}
		{subjects}
	/>
	<h1>Assets</h1>
	<slot name="pre-content"></slot>
	{#if items}
		{#if items.length}
			<div class="assets">
				{#each items as asset_group}
					<AssetsGroup {asset_group}/>
				{/each}
			</div>
			{#if items_count > page_size}
				<Pagination href="/assets" {page} {page_size} {items_count}/>
			{/if}
		{:else}
			<h2>No content found.</h2>
		{/if}
	{:else}
		<h2>Loading . . .</h2>
	{/if}
	<slot name="post-content"></slot>
</div>

<script>
	import { onDestroy, getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page: pageStore, goto } = get_sapper_stores()

	import { query_string_to_json } from '../../utils/api-utils'
	import { search_term } from '../../stores/app-store'

	import Pagination from '../page-lists/Pagination.svelte'
	import AssetsToolbar from './AssetsToolbar.svelte'
	import AssetsGroup from './AssetsGroup.svelte'

	export let items
	export let items_count = 0
	export let content_types = []
	export let subjects = []
	export let page_size = 0
	$: page = parseInt($pageStore.query.page)
	$: contentValue = $pageStore.query.type || ''
	$: decadeValue = $pageStore.query.decade || ''
	$: subjectValue = $pageStore.query.subject || ''

	let initialized = false
	const unsubscribe = search_term.subscribe(term => {
		if (initialized) {
			filter({ detail: { key: 'search_term', value: $search_term } }, true)
		} else {
			initialized = true
		}
	})
	onDestroy(() => {
		unsubscribe()
		search_term.set('')
	})

	async function filter(event, is_search_term) {
		const params = new URLSearchParams((new URL(location)).search)
		const { key, value } = event.detail
		if (value) {
			params.set(key, value)
		} else {
			params.delete(key)
		}
		params.set('page', '1')

		// manually fetching and setting history state
		// because `goto` forces input blue
		// SEE: https://github.com/sveltejs/sapper/blob/a52bdb2f4e1a722f06134b4065da2a32969e12e2/runtime/src/app/app.ts#L191
		if (is_search_term) {
			const res = await POST('/api/assets/page.json', query_string_to_json(params.toString()))
			page_size = res.page_size
			items = res.items
			items_count = res.items_count
			content_types = res.content_types
			subjects = res.subjects
			history.pushState({}, '', `${location.pathname}?${params.toString()}`)
		} else {
			goto(`${location.pathname}?${params.toString()}`)
		}

	}
</script>

<style type="text/scss">
	.assets {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0 0 100rem;
	}
	@media (--large-to-medium) {
		.assets {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (--small-down) {
		.assets {
			display: block;
		}
	}
</style>