<div class="picker">
	<div class="table">
		<div class="header">
			<div class="thumb-td"></div>
			<div class="filename">Filename</div>
			<div class="timestamp">Created</div>
			<div class="actions"></div>
		</div>
		{#each [...picked] as [key, asset] (key)}
			<AssetPickerRow bind:assets bind:picked {asset}/>
		{/each}
		{#each assets as asset (asset.id)}
			{#if !picked.has(asset.id)}
				<AssetPickerRow bind:assets bind:picked {asset}/>
			{/if}
		{/each}
	</div>
</div>

<script>
	import AssetPickerRow from './AssetPickerRow.svelte'

	export let assets
	export let picked
</script>

<style type="text/scss">
	.picker {
		overflow-x: hidden;
		overflow-y: auto;
		position: relative;
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
</style>
