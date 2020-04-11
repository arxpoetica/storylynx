<video bind:this={video} class:show use:lazy loop>
	<source bind:this={video_source} {src} type="video/mp4"/>
</video>

<script>
	export let asset
	// export let options
	export let intersecting

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
	video {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: black;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
		&.show {
			opacity: 1;
		}
	}
</style>
