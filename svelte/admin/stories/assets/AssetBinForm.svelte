<div class="bin">
	<Buttons classes="no-margin align-right">
		{#if remove_ids.length}
			<Button label="Remove Assets" classes="alert" handler={() => open_remove_modal = true}/>
		{:else}
			<Button
				label="Add Assets"
				classes="blank good plus"
				disabled={saveable}
				handler={() => $handlers.add_assets(clip_index, bin_index)}/>
			<Button
				label="Add HTML"
				classes="blank good plus"
				disabled={saveable}
				handler={() => $handlers.add_assets()}/>
		{/if}
	</Buttons>
	<div class="rows">
		<!-- <h3>Asset Bin {bin_index + 1}</h3> -->
		<Select
			label="Assets Transition"
			bind:value={bin.transition}
			options={$enums.asset_transitions}
		/>
		<div class="tools">
			<p class="instructions">Click on a row below to toggle details. Drag and drop rows to reorder them.</p>
		</div>
		<div class="assets">
			{#if bin.assets.length}
				{#each bin.assets as asset, index (asset.id)}
					<AssetRow bind:bin {index} {clip_index} {bin_index} bind:asset bind:remove_ids bind:draggable/>
				{/each}
			{:else}
				<p>[No assets]</p>
			{/if}
		</div>
	</div>
</div>
{#if open_remove_modal}
	<ModalRemoveAssets bind:bin {clip_index} {bin_index} bind:remove_ids bind:open={open_remove_modal}/>
{/if}

<script>
	export let bin
	export let clip_index
	export let bin_index
	export let saveable
	let remove_ids = []
	let open_remove_modal
	let draggable = false

	import { handlers, enums } from '../../../../stores/admin-store.js'

	import AssetRow from './AssetRow.svelte'
	import Select from '../../components/elements/Select.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'
	import ModalRemoveAssets from '../modals/ModalRemoveAssets.svelte'
</script>

<style type="text/scss">
	.bin {
		margin: 0 0 20rem;
		padding: 20rem;
		// background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		border-radius: 12rem;
	}
	// .rows {}
	.assets {
		display: grid;
		grid-gap: 3rem;
		min-height: 32rem;
	}
	.instructions {
		margin: 0;
		font: 13rem/1 var(--admin-font);
		opacity: 0.6;
	}
</style>
