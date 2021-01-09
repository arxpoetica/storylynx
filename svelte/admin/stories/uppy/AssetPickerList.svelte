<div class="picker-list">
	{#if picked.size}
		<div class="table">
			<div class="header">
				<div class="thumb-td"></div>
				<div class="filename">Filename</div>
				<div class="timestamp">Created</div>
				{#if can_pick}
					<div class="actions"></div>
				{/if}
			</div>
			{#each [...picked] as [key, asset] (key)}
				<AssetPickerRow bind:assets bind:picked {asset} {can_pick}/>
			{/each}
		</div>
	{/if}
	{#if loading}
		<Hourglass bind:loading/>
	{:else}
		{#if assets.length}
			<div class="table">
				<div class="header">
					<div class="thumb-td"></div>
					<div class="filename">Filename</div>
					<div class="timestamp">Created</div>
					{#if can_pick}
						<div class="actions"></div>
					{/if}
				</div>
				{#each assets as asset (asset.id)}
					{#if !picked.has(asset.id)}
						<AssetPickerRow bind:assets bind:picked {asset} {can_pick}/>
					{/if}
				{/each}
			</div>
		{:else}
			<div class="no-content">No files with name containing search "{search.trim()}".</div>
		{/if}
	{/if}
</div>

<script>
	import AssetPickerRow from './AssetPickerRow.svelte'
	import Hourglass from '../../components/widgets/Hourglass.svelte'

	export let assets
	export let picked
	export let search
	export let loading
	export let can_pick = true
</script>

<style type="text/scss">
	.picker-list {
		overflow-x: hidden;
		overflow-y: auto;
		position: relative;
		width: 100%;
		height: 100%;
		@mixin scrollbar {}
		:global {
			.thumb {
				width: 50rem;
				height: 50rem;
				background-color: var(--admin-accent-2);
			}
			.popup {
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
			}
			.hourglass {
				position: absolute;
				background-color: rgba(var(--admin-accent-0-rgb), 0.5);
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				color: white;
				z-index: 1;
			}
		}
	}
	.table {
		display: table;
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		font: 14rem/1.2 $font;
	}
	.header {
		display: table-row;
		font: $bold 11rem/0 $font;
		text-transform: uppercase;
		// cursor: pointer;
		> div {
			position: sticky;
			top: 0;
			display: table-cell;
			height: 40rem;
			padding: 0 12rem;
			background-color: var(--admin-color-1);
			vertical-align: middle;
			z-index: 1;
			&:first-child { padding: 0 0 0 12rem; }
		}
	}
	.actions { width: 46rem;}
	.thumb-td { width: 74rem;}
	.filename { width: 100%; }
	.no-content { padding: 20rem 0 0; }
</style>
