<audio bind:this={audio} bind:volume={indirect_volume} bind:muted={$muted} bind:paused use:lazy loop {src} type="audio/mp3"></audio>
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
	import { muted } from '../../../stores/story-store.js'
	import { tweened } from 'svelte/motion'
	import { cubicIn, cubicOut } from 'svelte/easing'

	let audio
	let loaded = false

	$: paused = !(loaded && intersecting) && $volume === 0

	let volume = tweened(0, { duration: 1000 })
	// TODO: delete when bug fixed
	$: indirect_volume = $volume
	$: if (loaded) {
		intersecting ? tween(asset.volume || 1, cubicIn) : tween(0, cubicOut)
	}
	async function tween(to, easing) {
		await volume.set(to, { easing })
	}

	let src = ''
	function lazy(audio) {
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
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
