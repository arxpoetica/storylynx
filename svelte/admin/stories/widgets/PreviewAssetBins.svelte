{#if bins.length}
	<div class="bins">
		{#each bins as bin}
			<div class="bin-section">
				<!-- {#if bin.assets.length} -->
					<!-- <p>bin: {JSON.stringify(Object.keys(bin))}</p> -->
				<!-- {/if} -->
				{#if bin.html_block && bin.html_block.code && bin.html_block.code.blocks && bin.html_block.code.blocks.length}
					<!-- <p>html_block: {JSON.stringify(Object.keys(bin.html_block))}</p> -->
					<div class="html">
						<!-- <p>id: {JSON.stringify(bin.html_block.id)}</p> -->
						<!-- <p>Name: {JSON.stringify(bin.html_block.name)}</p> -->
						<!-- <p>code: {JSON.stringify(bin.html_block.code)}</p> -->
						{@html code_to_html(bin.html_block.code)}
					</div>
				{/if}
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
