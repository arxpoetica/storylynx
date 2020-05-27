{#if bins.length}
	<div class="bins">
		{#each bins as bin}
			<div class="bin-section">
				<!-- {#if bin.assets.length} -->
					<!-- <p>bin: {JSON.stringify(Object.keys(bin))}</p> -->
				<!-- {/if} -->
				{#each bin.html_blocks as block}
					
					{#if block.code && block.code.blocks && block.code.blocks.length}
						<!-- <p>html block: {JSON.stringify(Object.keys(block))}</p> -->
						<div class="html">
							<!-- <p>id: {JSON.stringify(block.id)}</p> -->
							<!-- <p>Name: {JSON.stringify(block.name)}</p> -->
							<!-- <p>code: {JSON.stringify(block.code)}</p> -->
							{@html code_to_html(block.code)}
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
{/if}
<!-- <pre>bins: {JSON.stringify(bins, null, 2)}</pre> -->

<script>
	export let bins

	import { code_to_html } from './html-utils.js'
</script>

<style type="text/scss">
	// .bins {}
	// .bin-section {}
	// .bin {
	// }
	.html {
		border: 1rem solid var(--admin-blue-lighter);
		padding: 20rem;
	}
</style>
