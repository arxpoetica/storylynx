<div class="audio-wrap">
	{#if image}
		<InlineImage asset={image} {options}/>
	{/if}
	<audio use:lazy loop {src} type="audio/mp3"></audio>
</div>

<script>
	export let asset
	export let image
	export let options

	import InlineImage from './InlineImage.svelte'

	let src = ''
	function lazy(audio) {
		audio.oncanplaythrough = () => {
			// FIXME: remove this
			// audio.volume = 0.3
			audio.volume = 0
			audio.play()
		}
		src = asset.url
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.audio-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
</style>
