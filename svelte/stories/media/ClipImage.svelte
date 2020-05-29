<figure class="image" class:show class:cover>
	{#if cover}
		<div class="bg" style="background-image:url({src});{bg_pos}{style}"></div>
	{/if}
	<img {src} alt="n/a" use:lazy/>
	<ClipCaption {asset}/>
</figure>
{#if text}
	<!-- <ClipText asset={text} {intersecting} embedded={true}/> -->
	<ClipText asset={text} embedded={true}/>
{/if}

<script>
	export let asset
	export let text
	export let style
	export let intersecting

	import ClipText from './ClipText.svelte'
	import ClipCaption from './ClipCaption.svelte'

	let loaded = false
	let intersected; $: if (intersecting) { intersected = true }
	$: show = loaded && intersected

	import { format_url } from './inline-helpers.js'
	$: src = format_url(asset)

	import { camel_to_hyphen } from '../../../utils/basic-utils.js'
	$: bg_pos = asset.bg_pos ? `background-position:${camel_to_hyphen(asset.bg_pos).replace('-', ' ')};` : ''
	$: cover = !asset.contain

	function lazy(node) {
		const img = new Image()
		img.onload = () => loaded = true
		img.src = src
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.image {
		transition: opacity 0.5s ease-in-out;
		opacity: 0;
		&.show { opacity: 1; }
		&.cover {
			// overflow: hidden;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			img {
				position: absolute;
				right: 100%;
				bottom: 100%;
				opacity: 0;
				pointer-events: none;
			}
		}
	}
	.bg {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: none no-repeat center transparent;
		background-size: cover;
	}
	img {
		width: 100%;
	}
</style>
