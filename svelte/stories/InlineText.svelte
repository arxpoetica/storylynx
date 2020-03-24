<!-- <svelte:window on:resize={set_template_height} bind:innerHeight/> -->

<div class="text-wrap">
	<div class="content">
		{@html asset.html}
	</div>
	<!-- <img {src} alt="n/a" use:lazy/> -->
	<!-- <div class:show class="bg" style="background-image:url({src});"></div> -->
</div>

<script>
	export let asset
	// export let options

	// // TODO: how to fix height on smaller windows??????? (SEE media left / media right)
	// let content

	// let loaded = false
	// let show = false
	// let src; $: {
	// 	let path = asset.url.split(asset.handle)[0]
	// 	if (options.width || options.height) {
	// 		path += 'resize='
	// 		if (options.width && options.height) {
	// 			path += `w:${options.width},h:${options.height}`
	// 		} else if (options.width) {
	// 			path += `w:${options.width}`
	// 		} else {
	// 			path += `h:${options.height}`
	// 		}
	// 		path += options.crop ? ',fit:crop/' : '/'
	// 	} else if (options.crop) {
	// 		// just a default size if crop only
	// 		path += 'resize=w:600,h:600,fit:crop/'
	// 	}
	// 	src = path + asset.handle
	// }

	// function lazy(node) {
	// 	if (loaded) {
	// 		node.setAttribute('src', src)
	// 	} else {
	// 		const img = new Image()
	// 		img.onload = () => {
	// 			loaded = true
	// 			node.setAttribute('src', src)
	// 			setTimeout(() => show = true, 100)
	// 		}
	// 		img.src = src
	// 	}
	// 	return { destroy() {} } // noop
	// }
</script>

<style type="text/scss">
	.text-wrap {
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		height: 100%;
		padding: 60rem;
		background-color: #f7f7f7;
		& :global {
			img {
				// opacity: 0;
				width: 100%;
				height: auto;
				line-height: 0;
			}
		}
	}
	.content {
		width: 100%;
	}
</style>
