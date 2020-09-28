<div class="bins">

	<!-- order: 1 -->

	{#each $clip.asset_bins as bin, index (bin.id)}
		<div class="bin">
			<div class="rows">
				<!-- <h3>Asset Bin {index + 1}</h3> -->
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
						{#each bin.assets as asset, index}
							<AssetRow bind:asset {index}/>
						{/each}
					{:else}
						<p>[No assets]</p>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<script>
	import { preview_clip as clip, enums } from '../../../../stores/admin-store.js'

	import AssetRow from './AssetRow.svelte'
	import Select from '../../components/elements/Select.svelte'
</script>

<style type="text/scss">
	// .bins {}
	.bin {
		margin: 0 0 20rem;
		padding: 20rem;
		// background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		border-radius: 12rem;
	}
	.assets {
		display: grid;
		grid-gap: 3rem;
	}
	.instructions {
		font: 13rem/1 var(--admin-font);
		opacity: 0.6;
	}
</style>
