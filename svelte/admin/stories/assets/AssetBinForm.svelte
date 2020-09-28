<div class="bin">
	<Buttons classes="no-margin align-right">
		{#if remove_ids.length}
			<Button label="Remove Assets" classes="alert" handler={() => open_remove_modal = true}/>
		{:else}
			<Button label="Add Assets" classes="blank good" handler={() => console.log('ho')}/>
			<Button label="Add HTML" classes="blank good" handler={() => console.log('ho')}/>
		{/if}
	</Buttons>
	<div class="rows">
		<!-- <h3>Asset Bin {bin_index + 1}</h3> -->
		<Select
			label="Assets Transition"
			bind:value={bin.transition}
			options={$enums.asset_transitions}
		/>
		<div class="assets">
			<div class="tools">
				<p class="instructions">Click on a row below to show / hide details.</p>
			</div>
			{#if bin.assets.length}
				{#each bin.assets as asset (asset.id)}
					<AssetRow bind:asset bind:remove_ids/>
				{/each}
			{:else}
				<p>[No assets]</p>
			{/if}
		</div>
	</div>
</div>
{#if open_remove_modal}
	<ModalRemoveAssets bind:bin {clip_index} {bin_index} {remove_ids} bind:open={open_remove_modal}/>
{/if}

<script>
	export let bin
	export let clip_index
	export let bin_index
	let remove_ids = []
	let open_remove_modal

	import { enums } from '../../../../stores/admin-store.js'

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
	}
	.instructions {
		font: 13rem/1 var(--admin-font);
		opacity: 0.6;
	}
</style>
