<div class="video" class:show>
	<video bind:this={video} use:lazy loop {style}>
		<source bind:this={video_source} {src} type="video/mp4"/>
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
	$: show = loaded && intersected

	// video.play()
	let video
	$: if (show) { video.play() }

	let video_source
	let src = ''
	function lazy(video) {
		video.oncanplaythrough = async() => {
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			video.muted = true
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
		&.show {
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
