<audio bind:this={audio} use:lazy loop {src} type="audio/mp3"></audio>
{#if image}
	<ClipImage asset={image} {style} {options}/>
{/if}
{#if text}
	<!-- <ClipText asset={text} {intersecting} embedded={true}/> -->
	<ClipText asset={text} {style} embedded={true}/>
{/if}

<script>
	export let asset
	export let image
	export let text
	export let style
	export let options
	export let intersecting

	import ClipImage from './ClipImage.svelte'
	import ClipText from './ClipText.svelte'

	let loaded = false
	let intersected; $: if (intersecting) { intersected = true }
	$: play = loaded && intersected

	let audio
	// $: if (play) { audio.play() }

	let src = ''
	function lazy(audio) {
		audio.oncanplaythrough = () => {
			// FIXME: remove this
			// audio.volume = 0.3
			// audio.volume = 0
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
