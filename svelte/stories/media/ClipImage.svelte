<div class:show class="image">
	<div class="bg" style="background-image:url({src});{bg_pos}{bg_size}{style}"></div>
	<img {src} alt="n/a" use:lazy/>
</div>
{#if text}
	<!-- <ClipText asset={text} {intersecting} embedded={true}/> -->
	<ClipText asset={text} embedded={true}/>
{/if}

<script>
	export let asset
	export let text
	export let style
	export let intersecting
	export let forceload

	import ClipText from './ClipText.svelte'

	let loaded = false
	let intersected; $: if (intersecting) { intersected = true }
	$: show = loaded && (intersected || forceload)

	import { format_url } from './inline-helpers.js'
	$: src = format_url(asset)

	import { camel_to_hyphen } from '../../../utils/basic-utils.js'
	$: bg_pos = asset.bg_pos ? `background-position:${camel_to_hyphen(asset.bg_pos).replace('-', ' ')};` : ''
	$: bg_size = asset.contain ? 'background-size:contain;' : ''

	function lazy(node) {
		const img = new Image()
		img.onload = () => loaded = true
		img.src = src
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.image {
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
		&.show {
			opacity: 1;
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
		opacity: 0;
		position: absolute;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}
</style>
