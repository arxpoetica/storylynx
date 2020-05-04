<table>
	<thead>
		<ListHead bind:checked bind:checkeditems {items} {cols}/>
	</thead>
	<tbody>
		{#each items as item, index}
			<tr>
				<td><Checkbox bind:checked={checkeditems[index]}/></td>
				{#each cols as col}
					<td>
						{#if col.type === 'asset'}
							{#if item[col.col] && item[col.col].length}
								<div class="assets" style="background-image:url({src(item[col.col][0], { format: 'jpg', width: 59, height: 59, crop: true })});"></div>
							{:else}
								<div class="assets"></div>
							{/if}
						{:else if col.type === 'url'}
							<h2>
								<a href="{col.url}{item[col.slug || col.col]}">{item[col.col]}</a>
							</h2>
						{:else if col.type === 'array'}
							{#if item[col.col].length}
								{item[col.col].map(obj => obj[col.mapper]).join(', ')}
							{:else}
								No tags.
							{/if}
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
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<ListHead bind:checked bind:checkeditems {items} {cols}/>
	</tfoot>
</table>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	import { src } from '../../../utils/basic-utils.js'
	import dayjs from 'dayjs'
	import ListHead from './ListHead.svelte'
	import Checkbox from './Checkbox.svelte'
	export let cols
	export let items = []
	export let checkeditems = []
	$: checked = items.length === checkeditems.filter(val => val).length

	let priorQuery
	$: if (JSON.stringify(priorQuery) !== JSON.stringify($page.query)) {
		priorQuery = $page.query
		checkeditems = []
	}
</script>

<style type="text/scss">
	// table {
	// 	// label {
	// 	// }
	// 	input {
	// 		margin: 0;
	// 	}
	// }

	// .list {
	// 	overflow: auto;
	// }
	// a {
	// 	&:hover {
	// 	}
	// }
	.assets {
		width: 59rem;
		height: 59rem;
		// margin-right: 12rem;
		// background-color: $gray-6;
	}
	h2 {
		font: inherit;
		// font-weight: $bold;
	}
	td {
		&:first-child {
			vertical-align: middle;
		}
	}
	.datetime strong {
		font-size: 10rem;
		text-transform: uppercase;
	}
	// h3,
	// p {
	// 	margin: 0;
	// }
</style>
