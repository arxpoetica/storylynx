{#if clip.asset_bins.length}
	<div class="bins">
		{#each clip.asset_bins as bin, bin_index}
			<div class="bin-section">
				<!-- <p>bin: {JSON.stringify(Object.keys(bin))}</p> -->
				<!-- <p>id: {JSON.stringify(bin.id)}</p> -->
				<h3>Bin {bin_index + 1} (order {bin_index})</h3>
				<!-- <p>transition: {JSON.stringify(bin.transition)}</p> -->
				{#if bin.assets.length}
					<div class="bin">
						{#each bin.assets as asset, index}
							<AssetThumb item={asset} {index}/>
						{/each}
					</div>
				{:else}
					<div class="bin">
						<p>[No assets]</p>
					</div>
				{/if}
				<!-- FIXME: need to reinvent our approach to displaying and editing HTML !!!!! -->
				<!-- FIXME: need to reinvent our approach to displaying and editing HTML !!!!! -->
				<!-- FIXME: need to reinvent our approach to displaying and editing HTML !!!!! -->
				<!-- FIXME: need to reinvent our approach to displaying and editing HTML !!!!! -->
				<!-- FIXME: need to reinvent our approach to displaying and editing HTML !!!!! -->
				<!-- FIXME: need to reinvent our approach to displaying and editing HTML !!!!! -->
				<!-- FIXME: need to reinvent our approach to displaying and editing HTML !!!!! -->
				<!-- {#if bin.html_blocks.length}
					{#if bin.html_blocks.length}
						<div class="html-blocks">
							<h3>HTML Blocks</h3>
							{#each bin.html_blocks as block, block_index}
								<HtmlBlock bind:block {bin_index} {block_index} {selectedclip}/>
							{/each}
						</div>
					{/if}
				{/if} -->
			</div>
		{/each}
	</div>
{/if}

<script>
	export let clip
	// export let selectedclip
	// let edit_html = false

	import AssetThumb from '../../components/widgets/AssetThumb.svelte'
	// import HtmlBlock from '../html/HtmlBlock.svelte'
</script>

<style type="text/scss">
	.bin-section {
		margin: 0 0 20rem;
		padding: 0 0 20rem;
		border-bottom: 1rem solid var(--admin-accent-2);
		&:last-child {
			// margin: 0;
			padding: 0;
			border: 0;
		}
	}
	h3 {
		margin: 0 0 6rem;
		color: rgba(var(--admin-text-rgb), 0.75);
		font: 15rem var(--admin-font);
	}
	.bin {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(120rem, 100%), 1fr));
		grid-gap: 20rem;
		margin: 0 0 40rem;
		&:last-child { margin: 0; }
	}
</style>
