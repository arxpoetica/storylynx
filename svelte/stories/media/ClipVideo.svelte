<div class="video" class:loaded>
	<video
		bind:this={video}
		bind:volume={indirect_volume}
		bind:paused
		use:lazy
		loop
		style="{bg_size}{style}"
	>
		<source {src} type="video/mp4"/>
	</video>
</div>
{#if text}
	<!-- <ClipText asset={text} {style} {intersecting} embedded={true}/> -->
	<ClipText asset={text} {style} embedded={true}/>
{/if}

<script>
	export let asset
	export let text
	export let style
	export let intersecting

	import ClipText from './ClipText.svelte'
	import { muted } from '../../../stores/story-store.js'
	import { tweened } from 'svelte/motion'
	import { cubicIn, cubicOut } from 'svelte/easing'

	let video
	let loaded = false

	$: bg_size = asset.contain ? 'object-fit:contain;' : ''

	$: paused = !(loaded && intersecting) && $volume === 0
	$: if (loaded) { video.muted = $muted }

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
	function lazy(video) {
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
		video.oncanplaythrough = () => loaded = true
		src = asset.url
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.video {
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
		&.loaded {
			opacity: 1;
		}
	}
	video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		object-fit: cover;
	}
</style>
