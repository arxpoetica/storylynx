<div class="bin">
	<div class="rows">
		<div class="row">
			<Select
				label="Assets Transition"
				bind:value={bin.transition}
				options={$enums.asset_transitions}
			/>
			{#if !saveable}
				<div class="actions" class:open>
					<Dropdown bind:open>
						<Button label="Add Assets" classes="small plus" handler={() => $handlers.add_assets(clip_index, bin_index)}/>
						<Button label="Add HTML" classes="small plus" handler={() => $handlers.add_html(clip_index, bin_index)}/>
						<div></div>
						<Button label="Delete Bin" classes="blank small alert" handler={() => $handlers.delete_bin(clip_index, bin_index)}/>
					</Dropdown>
				</div>
			{/if}
		</div>
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
	{#if remove_ids.length}
		<Buttons classes="no-margin align-right">
			<Button label="Remove Assets" classes="alert" handler={() => open_remove_modal = true}/>
		</Buttons>
	{/if}
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
	let open = false

	import { handlers, enums } from '../../../../stores/admin-store.js'

	import AssetRow from './AssetRow.svelte'
	import Dropdown from '../../components/elements/Dropdown.svelte'
	import Select from '../../components/elements/Select.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'
	import ModalRemoveAssets from '../modals/ModalRemoveAssets.svelte'
</script>

<style type="text/scss">
	.bin {
		padding: 20rem 20rem 10rem;
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		border-radius: 12rem;
		&:hover {
			.actions {
				opacity: 0.75;
				&.open { opacity: 1; }
			}
		}
	}
	.rows {
		margin: 0 0 10rem;
	}
	.actions {
		display: flex;
		justify-content: flex-end;
		opacity: 0;
		&.open { opacity: 1; }
		// :global(.reveal) { transform: scale(0.75); }
	}
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
