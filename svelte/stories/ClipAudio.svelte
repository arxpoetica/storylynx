<audio bind:this={audio} use:lazy loop {src} type="audio/mp3"></audio>
{#if image}
	<ClipImage {intersecting} asset={image} {style} {options}/>
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
	$: if (play) { audio.play() }

	import { volume } from '../../stores/story-store.js'
	import { tweened } from 'svelte/motion'
	import { cubicIn, cubicOut } from 'svelte/easing'

	const progress_in = tweened(null, { duration: 1000, easing: cubicIn })
	const progress_out = tweened(null, { duration: 1000, easing: cubicOut })
	volume.subscribe(new_volume => {
		progress_in.set(new_volume)
		progress_out.set(new_volume)
	})
	progress_in.subscribe(change => {
		if (loaded && $volume === 1) { audio.volume = change }
	})
	progress_out.subscribe(change => {
		if (loaded && $volume === 0) { audio.volume = change }
	})

	let src = ''
	function lazy(audio) {
		audio.oncanplaythrough = () => {
			audio.volume = $volume
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
