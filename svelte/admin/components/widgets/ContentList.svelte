<div class="content-list">
	<ContentListHeader bind:checked bind:checkeditems {cols}/>
	{#each $vars.items as item, index}
		<a href="/admin/{segment}/{item.id}" class="row">
			<div class="col"><Checkbox bind:checked={checkeditems[index]}/></div>
			{#each cols as col}
				<div class="col">
					{#if col.type === 'title'}
						<h2>{item[col.col]}</h2>
					{:else if col.type === 'assets'}
						{#if item[col.col] && item[col.col].length}
							<div class="assets" style="background-image:url({src(item[col.col][0], { format: 'jpg', width: 59, height: 59, crop: true })});"></div>
						{:else}
							<div class="assets"></div>
						{/if}
					{:else if col.type === 'array'}
						<div class="tags">
							{#if item[col.col].length}
									{#each item[col.col].map(obj => obj[col.mapper]) as name}
										<div class="tag">{name}</div>
									{/each}
							{:else}
								--
							{/if}
						</div>
					{:else if col.type === 'datetime'}
						<div class="datetime">
							{#if item.status}
								<strong>{item.status.toLowerCase()}</strong> <br>
							{/if}
							{dayjs(item[col.col]).format('M/D/YYYY')}
						</div>
					{:else if col.type === 'function'}
						{col.col(item)}
					{:else}
						{item[col.col]}
					{/if}
				</div>
			{/each}
		</a>
	{/each}
</div>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	import { content_vars as vars } from '../../../../stores/admin-store.js'
	import { src } from '../../../../utils/basic-utils.js'
	import dayjs from 'dayjs'

	import ContentListHeader from './ContentListHeader.svelte'
	import Checkbox from '../elements/Checkbox.svelte'

	export let cols
	export let segment
	export let checkeditems = []
	$: checked = $vars.items.length === checkeditems.filter(val => val).length

	let priorQuery
	$: if (JSON.stringify(priorQuery) !== JSON.stringify($page.query)) {
		priorQuery = $page.query
		checkeditems = []
	}
</script>

<style type="text/scss">
	.content-list {
		display: table;
		width: 100%;
		background-color: var(--admin-white);
		border-collapse: collapse;
		border-spacing: 0;
		font: 14rem/1.2 $font;
	}
	.row {
		display: table-row;
		border-bottom: 1rem solid var(--admin-gray-light);
		color: inherit;
		text-decoration: none;
		cursor: pointer;
		&:hover { background-color: var(--admin-blue-faint); }
	}
	.col {
		display: table-cell;
		padding: 0 8rem;
		vertical-align: middle;
	}
	.assets {
		width: 59rem;
		height: 59rem;
	}
	h2 {
		margin: 0;
		font: inherit;
	}
	.tags {
		// display: grid;
		// grid-template-rows: repeat(1fr, minmax(40rem, auto));
		font: 12rem/1 $font;
	}
	.tag {
		display: inline-block;
		padding: 4rem 6rem;
		margin: 2rem;
		background-color: var(--admin-gray-lighter);
		border-radius: 3rem;
	}
	.datetime strong {
		font-size: 10rem;
		text-transform: uppercase;
	}
</style>
