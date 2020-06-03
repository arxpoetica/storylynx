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
			{#if next_batch}
				<div class="wrap">
					<button class="button" on:click={() => load_content()}>Load More</button>
				</div>
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
	export let items
	export let next_batch
	export let batch_size
	export let content_types
	export let decades
	export let subjects

	import { onMount, onDestroy } from 'svelte'
	import { POST } from '../../utils/loaders.js'
	import { type, decade, subject, search_term } from '../../stores/app-store.js'

	import AssetsToolbar from './AssetsToolbar.svelte'
	import AssetsGroup from './AssetsGroup.svelte'

	let init = false
	let prior_type, prior_decade, prior_subject, prior_search_term
	onMount(() => {
		const params = new URLSearchParams(window.location.search)
		if (params.has('type')) { $type = params.get('type') }
		if (params.has('decade')) { $decade = params.get('decade') }
		if (params.has('subject')) { $subject = params.get('subject') }
		if (params.has('search_term')) { $search_term = params.get('search_term') }
		prior_type = $type
		prior_decade = $decade
		prior_subject = $subject
		prior_search_term = $search_term
		init = true
	})

	$: if (init) {
		if ($type !== prior_type) {
			prior_type = $type
			load_content('type', $type, true)
		}
		if ($decade !== prior_decade) {
			prior_decade = $decade
			load_content('decade', $decade, true)
		}
		if ($subject !== prior_subject) {
			prior_subject = $subject
			load_content('subject', $subject, true)
		}
		if ($search_term !== prior_search_term) {
			prior_search_term = $search_term
			load_content('search_term', $search_term, true)
		}
	}

	let batch = 1
	async function load_content(key, value, reset) {
		batch = reset ? 1 : batch + 1

		const params = new URLSearchParams(window.location.search)
		if (key && value) {
			params.set(key, value)
		} else if (key) {
			params.delete(key)
		}

		const res = await POST('/api/public/assets/batch.post', Object.assign({
			batch,
			batch_size,
		}, Object.fromEntries(params)))

		items = reset ? res.items : [...items, ...res.items]
		next_batch = res.next_batch

		let search = params.toString()
		search = search ? `?${search}` : ''
		history.replaceState({}, '', location.pathname + search)
		if (reset) { window.scrollTo(0, 0) }
	}

	onDestroy(() => {
		$type = ''
		$decade = ''
		$subject = ''
		$search_term = ''
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
