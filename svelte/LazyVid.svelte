<div class="shell" style="padding-bottom:{vid_height / vid_width * 100}%;">
	<div class="inner-shell">
		{#if is_vimeo}
			<div class="video">
				<iframe src="https://player.vimeo.com/video/{src.split('vimeo.com/')[1]}?color=ffffff&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen title="Video asset"></iframe>
			</div>
		{:else}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video bind:this={video} controls use:lazy>
				<source src={loading_src} type="video/mp4"/>
				<p>This browser does not support the video element.</p>
			</video>
		{/if}
	</div>
</div>

<script>
	let video
	export let src = ''
	let loading_src = ''
	// export let alt = 'No information present about this video.'
	export let thumb = false
	export let width = 100
	export let height = 100

	$: is_vimeo = src.indexOf('vimeo') > -1

	$: vid_width = thumb ? width : (is_vimeo ? 720 : width)
	$: vid_height = thumb ? height : (is_vimeo ? 405 : height)

	function lazy(video) {
		// TODO: also account for vimeo loading
		video.onloadedmetadata = () => {
			width = video.videoWidth
			height = video.videoHeight
			// loaded = true
			// setTimeout(() => show = true, 100)
		}
		loading_src = src
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.shell {
		position: relative;
		height: 0;
		background-color: #f5f5f5;
		// background-color: rgb(2, 0, 36);
		// background: linear-gradient(45deg, $white, #f5f5f5);
		// background-size: 400%;
		// animation: shine 2s linear infinite;
		// &.show {
		// 	animation: none;
		// }
	}
	// @keyframes shine {
	// 	0% { background-position: 0% 50%; }
	// 	50% { background-position: 100% 50%; }
	// 	100% { background-position: 0% 50%; }
	// }
	.inner-shell {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: none no-repeat center transparent;
		background-size: cover;
		// opacity: 0;
		// transition: opacity 0.3s ease-in-out;
		// &.show {
		// 	opacity: 1;
		// }
	}
	.video {
		position: relative;
		padding: 56.25% 0 0 0;
		iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
	video {
		flex: 1;
	}
</style>
