<div class="video" class:play>
	<video bind:this={video} use:lazy loop {style}>
		<source {src} type="video/mp4"/>
	</video>
</div>
{#if text}
	<!-- <ClipText asset={text} {intersecting} embedded={true}/> -->
	<ClipText asset={text} embedded={true}/>
{/if}

<script>
	export let asset
	export let text
	export let style
	// export let options
	export let intersecting

	import ClipText from './ClipText.svelte'

	let loaded = false
	let intersected; $: if (intersecting) { intersected = true }
	$: play = loaded && intersected

	let video
	$: if (play) { video.play() }

	import { volume } from '../../stores/story-store.js'
	import { tweened } from 'svelte/motion'
	import { cubicIn, cubicOut } from 'svelte/easing'

	const progress_in = tweened(null, { duration: 1000, easing: cubicIn })
	const progress_out = tweened(null, { duration: 1000, easing: cubicOut })
	volume.subscribe(new_volume => {
		progress_in.set(new_volume)
		progress_out.set(new_volume)
	})
	progress_in.subscribe(change => { if (video && $volume === 1) { video.volume = change } })
	progress_out.subscribe(change => { if (video && $volume === 0) { video.volume = change } })

	let src = ''
	function lazy(video) {
		video.oncanplaythrough = async() => {
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// video.muted = true
			video.volume = $volume
			loaded = true
		}
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
		&.play {
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
