<div class="layout-main">
	<AssetsToolbar {content_types} {decades} {subjects}/>
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

	import { POST } from '../../utils/loaders.js'
	import { search_term, type, decade, subject } from '../../stores/app-store.js'

	import Pagination from '../page-lists/Pagination.svelte'
	import AssetsToolbar from './AssetsToolbar.svelte'
	import AssetsGroup from './AssetsGroup.svelte'

	export let items
	export let items_count = 0
	export let content_types = []
	export let decades = []
	export let subjects = []
	export let page_size = 0
	$: page = parseInt($pageStore.query.page)

	$: $search_term = $pageStore.query.search_term || ''
	$: $type = $pageStore.query.type || ''
	$: $decade = $pageStore.query.decade || ''
	$: $subject = $pageStore.query.subject || ''

	let initialized = false
	let prior_search_term = $search_term
	let prior_type = $type
	let prior_decade = $decade
	let prior_subject = $subject
	$: if (initialized) {
		if ($search_term !== prior_search_term) {
			prior_search_term = $search_term
			filter('search_term', $search_term, true)
		}
		if ($type !== prior_type) {
			prior_type = $type
			filter('type', $type)
		}
		if ($decade !== prior_decade) {
			prior_decade = $decade
			filter('decade', $decade)
		}
		if ($subject !== prior_subject) {
			prior_subject = $subject
			filter('subject', $subject)
		}
	} else {
		initialized = true
	}

	async function filter(key, value, is_search_term) {
		const params = new URLSearchParams((new URL(location)).search)
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
			const res = await POST('/api/assets/page.post', Object.fromEntries(params))
			page_size = res.page_size
			items = res.items
			items_count = res.items_count
			content_types = res.content_types
			subjects = res.subjects
			history.replaceState({}, '', `${location.pathname}?${params.toString()}`)
		} else {
			goto(`${location.pathname}?${params.toString()}`, { replaceState: true })
		}
	}

	onDestroy(() => {
		$search_term =''
		$type =''
		$decade =''
		$subject =''
	})
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
