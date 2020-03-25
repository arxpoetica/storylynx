<div class:show class="bg-wrap">
	<img {src} alt="n/a" use:lazy/>
	<div class:show class="bg" style="background-image:url({src});{bg_pos}"></div>
</div>

<script>
	export let asset
	export let options
	let show = false

	import { format_url } from './inline-helpers.js'
	$: src = format_url(asset.url, options)

	import { camel_to_hyphen } from '../../utils/basic-utils.js'
	$: bg_pos = asset.bg_pos ? `background-position:${camel_to_hyphen(asset.bg_pos).replace('-', ' ')};` : ''

	function lazy(node) {
		const img = new Image()
		img.onload = () => setTimeout(() => show = true, 100)
		img.src = src
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.bg-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.bg {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: none no-repeat center transparent;
		background-size: cover;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
		&.show {
			opacity: 1;
		}
	}
	img {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
	}
</style>
