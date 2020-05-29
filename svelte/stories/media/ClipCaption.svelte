{#if asset.caption || asset.source}
	<!-- svelte-ignore a11y-structure -->
	<figcaption class:has-caption={caption} class:has-source={source}>
		{#if caption}
			<span class="caption">{caption}</span>
		{/if}
		{#if source}
			<span class="source">{source}</span>
		{/if}
	</figcaption>
{/if}

<script>
	export let asset

	$: caption = asset.caption
	$: source = asset.source
</script>

<style type="text/scss">
	figcaption {
		margin: 18rem 0 0;
		font-size: 12rem;
		line-height: 16rem;
		&.has-caption.has-source {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			.caption { text-align: left; }
			.source {
				text-align: right;
				max-width: 38%;
				margin-left: 20rem;
			}
		}
	}
	.caption { text-transform: uppercase; }
	.source { opacity: 0.5; }
</style>
