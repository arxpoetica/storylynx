<div class="row">
	<div class="col col-checkbox">
		<Checkbox handler={uncheck} bind:checked color="green"/>
	</div>
	{#each cols as col}
		{#if col.sort}
			<div class="col col-{col.type} action">
				<div on:click={() => resort(col.col)} class="sort">
					{col.title}
					<!-- {#if column === col.col}
						{#if sort === 'asc'}
							<div class="svg"><CaretUp/></div>
						{:else}
							<div class="svg"><CaretDown/></div>
						{/if}
					{/if} -->
				</div>
			</div>
		{:else}
			<div class="col col-{col.type}">
				{col.title}
			</div>
		{/if}
	{/each}
</div>

<script>
	// import { get } from 'svelte/store'
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page, goto } = get_sapper_stores()

	import { content_vars as vars } from '../../../../stores/admin-store.js'

	import Checkbox from '../elements/Checkbox.svelte'
	// import CaretDown from '@johnny/svg/caret-down.svelte'
	// import CaretUp from '@johnny/svg/caret-up.svelte'

	export let checked
	export let checkeditems
	export let cols
	function uncheck() {
		checkeditems = checked ? [] : [...Array($vars.items.length)].map(item => true)
	}

	$: column = $page.query.column
	$: sort = $page.query.sort

	function resort(sorter) {
		const { query } = $page
		const params = new URLSearchParams()
		for (let key in query) {
			const value = query[key]
			if (key === 'column') {
				params.set(key, sorter)
			} else if (key === 'sort') {
				if (query.column === sorter) {
					params.set(key, query.sort === 'asc' ? 'desc' : 'asc')
				} else {
					params.set(key, query.sort)
				}
			} else {
				params.set(key, value)
			}
		}
		goto(`${window.location.pathname}?${params.toString()}`, { replaceState: true })
	}
</script>

<style type="text/scss">
	.row {
		display: table-row;
		border-bottom: 1rem solid var(--admin-accent-2);
		font: $bold 13rem/1 $font;
		cursor: pointer;
	}
	.col {
		display: table-cell;
		padding: 3rem 8rem;
		vertical-align: middle;
		border-left: 1rem solid var(--admin-accent-2);
		&:first-child { border: 0; }
	}
	.col-checkbox {
		width: 48rem;
	}
	.col-assets {
		width: calc(59rem + 16rem);
	}
	.sort {
		display: flex;
		align-items: center;
	}
	.svg {
		flex-basis: 20rem;
	}
</style>
