<!-- https://css-tricks.com/fluid-width-video/ -->
<figure class="video" class:loaded class:cover>
	<div class="view">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video bind:this={video} bind:paused bind:volume={indirect_volume} bind:muted={$muted} use:lazy {loop} {style}>
			<source {src} type="video/mp4"/>
		</video>
	</div>
	<ClipCaption {asset}/>
</figure>
{#if text}
	<!-- <ClipText asset={text} {style} {intersecting} embedded={true}/> -->
	<ClipText asset={text} {style} embedded={true}/>
{/if}

<script>
	export let asset
	export let text
	export let style
	export let intersecting
	export let loaded = false

	import ClipText from './ClipText.svelte'
	import ClipCaption from './ClipCaption.svelte'
	import { muted, can_autoplay } from '../../../stores/story-store.js'
	import { tweened } from 'svelte/motion'
	import { cubicIn, cubicOut } from 'svelte/easing'

	$: cover = !asset.contain
	$: loop = !asset.play_once

	let video
	let volume = tweened(0, { duration: 1000 })

	// ----->>>>> PLAYING / PAUSED
	$: paused = !(loaded && $can_autoplay && intersecting) && $volume === 0

	// ----->>>>> VOLUME
	// TODO: see: https://github.com/sveltejs/svelte/issues/5043
	$: indirect_volume = $volume
	$: if (loaded && $can_autoplay) { intersecting ? tween(asset.volume || 1, cubicIn) : tween(0, cubicOut) }
	async function tween(to, easing) { await volume.set(to, { easing }) }

	let src = ''
	function lazy(video) {
		video.oncanplaythrough = () => loaded = true
		src = asset.url
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.video {
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
		&.loaded { opacity: 1; }
		&.cover {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			.view {
				overflow: hidden;
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
			}
			video {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				background-color: black;
			}
		}
	}
	video {
		width: 100%;
		height: auto;
		object-fit: cover;
	}
</style>
