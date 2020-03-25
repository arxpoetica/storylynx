<!-- <svelte:window on:resize={set_template_height} bind:innerHeight/> -->

<!-- <figure>
	<img...>
	<figcaption>...</figcaption>
</figure> -->

<div class:show class="text-wrap">
	<div bind:this={content} class="content">
		<!-- {@html asset.html} -->
	</div>
</div>

<script>
	// TODO: how to fix height on smaller windows??????? (SEE media left / media right)

	export let asset
	// export let options
	let content

	import { onMount } from 'svelte'
	import { format_url } from './inline-helpers.js'
	// $: src = format_url(asset.url, options)

	const loading = []
	let loaded = 0
	let transpired = false
	$: show = loading.length === loaded && transpired

	onMount(() => {
		const div = document.createElement('div');
		div.innerHTML = asset.html
		const images = div.querySelectorAll('img')

		for (let img of images) {
			// just some basic cleanup:
			// TODO: remove later when we have a non-graphcms think...need to think through that all...
			img.removeAttribute('title')
			img.removeAttribute('width')
			img.removeAttribute('height')
			// TODO: remove later when we have a non-graphcms think...need to think through that all...
			if (img.src.includes('graphcms')) {
				loading.push({ img, src: format_url(img.src, { width: 600 }) })
				img.removeAttribute('src')
				img.onload = () => loaded++
			}
		}
		content.appendChild(div)
		for (let load of loading) { load.img.src = load.src }
		transpired = true
	})
</script>

<style type="text/scss">
	.text-wrap {
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
	}
</style>
