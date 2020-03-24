<div class="vid-wrap">
	<video class:show use:lazy loop>
		<source bind:this={video_source} {src} type="video/mp4"/>
	</video>
</div>

<script>
	export let asset
	// export let options

	let show = false

	let video_source
	let src = ''
	function lazy(video) {
		console.log('yes')
		video.oncanplaythrough = async() => {
			console.log('yes sir!')
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes FIXME:
			video.muted = true
			await video.play()
			show = true
		}
		src = asset.url
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.vid-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
		&.show {
			opacity: 1;
		}
	}
</style>
