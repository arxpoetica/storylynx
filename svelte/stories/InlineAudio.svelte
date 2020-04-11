{#if image}
	<InlineImage asset={image} {options}/>
{/if}
<audio bind:this={audio} use:lazy loop {src} type="audio/mp3"></audio>

<script>
	export let asset
	export let image
	export let options
	export let intersecting

	let loaded = false
	let intersected; $: if (intersecting) { intersected = true }
	$: play = loaded && intersected

	let audio
	$: if (play) { audio.play() }

	import InlineImage from './InlineImage.svelte'

	let src = ''
	function lazy(audio) {
		audio.oncanplaythrough = () => {
			// FIXME: remove this
			// audio.volume = 0.3
			audio.volume = 0
			loaded = true
		}
		src = asset.url
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	audio {
		pointer-events: none;
	}
</style>
