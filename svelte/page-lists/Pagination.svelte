<div class="pagination">
	<div class="info">Page {page} of {Math.ceil(items_count / page_size)}</div>
	<nav>
		{#if href}
			<a href="{href}?{createQuery(page - 1, query)}" class="prev-next prev" class:on={page > 1}>Prev</a>
		{:else}
			<button on:click={() => page -= 1} class="prev-next prev" class:on={page > 1}>Prev</button>
		{/if}
		<div class="pages">
			{#each range as rangeNumber}
				{#if rangeNumber === page}
					<span class="page current">{rangeNumber}</span>
				{:else if rangeNumber === '...'}
					<span class="etc">{rangeNumber}</span>
				{:else}
					{#if href}
						<a class="page" href="{href}?{createQuery(rangeNumber, query)}">{rangeNumber}</a>
					{:else}
						<button class="page" on:click={() => page = rangeNumber}>{rangeNumber}</button>
					{/if}
				{/if}
			{/each}
		</div>
		{#if href}
			<a href="{href}?{createQuery(page + 1, query)}" class="prev-next next" class:on={page < pagesCount}>Next</a>
		{:else}
			<button on:click={() => page += 1} class="prev-next next" class:on={page < pagesCount}>Next</button>
		{/if}
	</nav>
</div>

<script>
	import { page as page_store } from '../../stores/app-store.js'
	import { createPaginationRange, createQuery } from '../../utils/page-helpers'
	import Prev from '../svg/prev.svelte'
	import Next from '../svg/next.svelte'

	export let href = ''
	export let page = 1
	export let page_size
	export let items_count

	// REMINDER: what is a page in this context?
	// ANSWER: it's a navigational number (1, 2, 3) representing the page to turn to
	// ALSO: `page` is the current number
	$: pagesCount = Math.ceil(items_count / page_size)
	$: range = createPaginationRange(page, pagesCount)
	$: query = $page_store.query
</script>

<style type="text/scss">
	.pagination {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 0 20rem;
	}
	.info {
		margin: 0 0 18rem;
	}
	nav {
		display: flex;
		align-items: center;
		line-height: 1;
	}
	.prev-next {
		background-color: transparent;
		border-color: transparent;
		color: transparent;
		pointer-events: none;
		&.on {
			background-color: transparent;
			color: $black;
			pointer-events: all;
		}
		&:hover {
			border: none;
			text-decoration: underline;
		}	
	}
	.prev { margin-right: 35rem; }
	.next { margin-left: 35rem; }
	.pages {
		display: flex;
	}
	.page,
	.current,
	.etc {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 25rem;
		min-width: 25rem;
		margin: 0 5rem;
		padding: 0 4rem;
	}
	.page {
		background-color: transparent;
		border: 1px solid #eaeaeb;
		color: $black;
		text-decoration: none;
		outline: 0;
		user-select: none;
		transition: border-color 0.25s ease-in-out;
		&:hover,
		&:active {
			border-color: $links;
		}
	}
	.current {
		border-color: $black;
		cursor: default;
	}
	.etc {
		cursor: default;
	}
	@media (--small-down) {
		nav { flex-direction: column; }
		.prev { margin: 0 0 15rem; }
		.next { margin: 15rem 0 0; }
	}
</style>
