<!-- <p>bins: {JSON.stringify(bins)}</p> -->

{#if bins.length}
	<div class="bins">
		{#each bins as bin, bin_index}
			<div class="bin-section">
				<!-- <p>bin: {JSON.stringify(Object.keys(bin))}</p> -->
				<p>id: {JSON.stringify(bin.id)}</p>
				<p>order: {JSON.stringify(bin.order)}</p>
				<p>transition: {JSON.stringify(bin.transition)}</p>
				{#if bin.assets.length}
					<div class="bin">
						{#each bin.assets as asset, index}
							<AssetThumb item={asset} {index}/>
						{/each}
					</div>
				{:else}
					<p>[No assets]</p>
				{/if}
				<HtmlBlock bind:block={bin.html_block} {bin_index} {selectedclip}/>
			</div>
		{/each}
	</div>
{/if}

<script>
	export let bins
	export let selectedclip
	let edit_html = false

	import AssetThumb from '../../components/widgets/AssetThumb.svelte'
	import HtmlBlock from './HtmlBlock.svelte'
</script>

<style type="text/scss">
	.bins {
		padding: 2rem;
		border: 1rem solid var(--admin-blue-lighter);
		background-color: var(--admin-blue-faint);
	}
	.bin-section {
		margin: 0 0 2rem;
		padding: 20rem;
		background-color: white;
		border: 1rem solid var(--admin-blue-lighter);
		&:last-child {
			margin: 0;
		}
	}
	.bin {
		display: grid;
		grid-template-columns: repeat(auto-fit, 100rem);
		grid-gap: 10rem;
		margin-bottom: 10rem;
		margin: 0 0 10rem;
		&:last-child {
			margin: 0;
		}
	}
</style>
