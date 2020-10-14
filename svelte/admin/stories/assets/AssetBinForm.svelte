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
					{#if bin_index > 0}
						<button class="swap swap-up" on:click={() => swap(bin_index - 1)} title="Swap with above asset bin"><Swap/></button>
					{/if}
					{#if bin_index < clip.asset_bins.length - 1}
						<button class="swap swap-down" on:click={() => swap(bin_index + 1)} title="Swap with below asset bin"><Swap/></button>
					{/if}
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
	export let clip
	export let bin
	export let clip_index
	export let bin_index
	export let saveable
	let remove_ids = []
	let open_remove_modal
	let draggable = false
	let open = false

	import { handlers, enums, seq, preview_clip } from '../../../../stores/admin-store.js'
	import { POST } from '../../../../utils/loaders.js'

	import AssetRow from './AssetRow.svelte'
	import Swap from '../../../svg/admin-icon-swap.svelte'
	import Dropdown from '../../components/elements/Dropdown.svelte'
	import Select from '../../components/elements/Select.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'
	import ModalRemoveAssets from '../modals/ModalRemoveAssets.svelte'

	async function swap(swap_index) {
		const swap_bin = clip.asset_bins[swap_index]

		// NOTE: this is necessary for storing in a variable so swapping out below doesn't override itself
		const { order: bin_order } = bin
		const { order: swap_bin_order } = swap_bin

		const res = await POST('/api/admin/stories/bins-reorder.post', {
			bin_changes: [
				{ id: bin.id, order: swap_bin_order },
				{ id: swap_bin.id, order: bin_order },
			],
		})

		if (res.error) {
			alert('Something went wrong. The asset bins could not be swapped. Please contact the administrator of this site for assistance.')
			return false
		}

		$seq.clips[clip_index].asset_bins[bin_index].order = swap_bin_order
		$seq.clips[clip_index].asset_bins[swap_index].order = bin_order
		$seq.clips[clip_index].asset_bins = $seq.clips[clip_index].asset_bins.sort((one, two) => one.order - two.order)

		$preview_clip.asset_bins[bin_index].order = swap_bin_order
		$preview_clip.asset_bins[swap_index].order = bin_order
		$preview_clip.asset_bins = $preview_clip.asset_bins.sort((one, two) => one.order - two.order)
	}
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
	.swap {
		width: 34rem;
		height: 34rem;
		margin: 0 6rem 0 0;
		padding: 0;
		padding: 8rem;
		background-color: var(--admin-bg);
		border: 0;
		border-radius: 100%;
		line-height: 0;
		color: var(--admin-accent-4);
		transition: all 0.15s ease-in-out;
		cursor: pointer;
		-webkit-appearance: none;
		user-select: none;
		&:hover { background-color: var(--admin-accent-0); }
		&:focus {
			outline: none;
			box-shadow: var(--admin-form-shadow);
		}
		&.swap-up { transform: rotate(180deg); }
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
