<!-- <p>bins: {JSON.stringify(bins)}</p> -->

{#if bins.length}
	<div class="bins">
		{#each bins as bin}
			<div class="bin-section">
				{#if bin.assets.length}
					<p>bin: {JSON.stringify(Object.keys(bin))}</p>
					<p>order: {JSON.stringify(bin.order)}</p>
					<p>transition: {JSON.stringify(bin.transition)}</p>
					<div class="bin">
						{#each bin.assets as asset, index}
							<AssetThumb item={asset} {index}/>
						{/each}
					</div>
					{#if bin.html_block}
						<div class="html">
							<p>html_block: {JSON.stringify(Object.keys(bin.html_block))}</p>
							<p>id: {JSON.stringify(bin.html_block.id)}</p>
							<p>name: {JSON.stringify(bin.html_block.name)}</p>
							<p>html_code: {JSON.stringify(bin.html_block.html_code)}</p>
						</div>
					{/if}
				{:else}
					Empty bin
				{/if}
			</div>
		{/each}
	</div>
{/if}

<script>
	export let bins

	import AssetThumb from './AssetThumb.svelte'
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
