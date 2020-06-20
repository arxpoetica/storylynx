<audio bind:this={audio} bind:paused bind:volume={indirect_volume} bind:muted={$muted} use:lazy loop {src} type="audio/mp3"></audio>
{#if image}
	<ClipImage {intersecting} asset={image} {style}/>
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
	export let intersecting

	import ClipImage from './ClipImage.svelte'
	import ClipText from './ClipText.svelte'
	import { muted, can_autoplay } from '../../../stores/story-store.js'
	import { tweened } from 'svelte/motion'
	import { cubicIn, cubicOut } from 'svelte/easing'

	let audio
	let loaded = false
	let volume = tweened(0, { duration: 1000 })

	// ----->>>>> PLAYING / PAUSED
	$: paused = !(loaded && $can_autoplay && intersecting) && $volume === 0

	// ----->>>>> VOLUME
	// TODO: see: https://github.com/sveltejs/svelte/issues/5043
	$: indirect_volume = $volume
	$: if (loaded && $can_autoplay) { intersecting ? tween(asset.volume || 1, cubicIn) : tween(0, cubicOut) }
	async function tween(to, easing) { await volume.set(to, { easing }) }

	// ----->>>>> LOADING
	let src = ''
	function lazy(audio) {
		audio.oncanplaythrough = () => loaded = true
		src = asset.url
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	audio {
		pointer-events: none;
	}
</style>
