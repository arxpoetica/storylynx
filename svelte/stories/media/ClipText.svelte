<!-- <svelte:window on:resize={set_template_height} bind:innerHeight/> -->

<article class="article article-{template} highlight-{color}" bind:this={article} class:show class:embedded>
	<div class="content" {style}>
		{@html asset.html}
	</div>
</article>

<script>
	// TODO: how to fix height on smaller windows??????? (SEE media left / media right)

	import { camel_to_hyphen } from '../../../utils/basic-utils.js'

	export let asset
	export let style
	export let embedded = false

	let article
	let images
	let loaded_count = 0
	$: show = images && loaded_count === images.length
	// TODO: move this hyphenation all the way upstream to the API
	$: template = asset.template ? camel_to_hyphen(asset.template) : 'default'
	$: color = asset.color ? camel_to_hyphen(asset.color) : 'none'

	import { onMount } from 'svelte'
	onMount(() => {
		images = article.querySelectorAll('img')
		for (let img of images) {
			const src = img.src
			img.src = ''
			img.onload = () => loaded_count++
			img.src = src
		}
	})
</script>

<style type="text/scss">
	.article {
		overflow: hidden;
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		height: 100%;
		padding: 60rem;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
		&.show {
			opacity: 1;
		}
		& :global {
			img {
				display: block;
				max-width: 100%;
				height: auto;
				margin: 0 auto;
				line-height: 0;
			}
		}
	}
	.content {
		width: 100%;
		margin: 0 auto;
	}
</style>
