<div class:show class="bg-wrap">
	<img {src} alt="n/a" use:lazy/>
	<div class:show class="bg" style="background-image:url({src});"></div>
</div>

<script>
	export let asset
	export let options

	let loaded = false
	let show = false
	let src; $: {
		let path = asset.url.split(asset.handle)[0]
		if (options.width || options.height) {
			path += 'resize='
			if (options.width && options.height) {
				path += `w:${options.width},h:${options.height}`
			} else if (options.width) {
				path += `w:${options.width}`
			} else {
				path += `h:${options.height}`
			}
			path += options.crop ? ',fit:crop/' : '/'
		} else if (options.crop) {
			// just a default size if crop only
			path += 'resize=w:600,h:600,fit:crop/'
		}
		src = path + asset.handle
	}

	function lazy(node) {
		if (loaded) {
			node.setAttribute('src', src)
		} else {
			const img = new Image()
			img.onload = () => {
				loaded = true
				node.setAttribute('src', src)
				setTimeout(() => show = true, 100)
			}
			img.src = src
		}
		return { destroy() {} } // noop
	}
</script>

<style type="text/scss">
	.bg-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.bg {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: none no-repeat center transparent;
		background-size: cover;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
		&.show {
			opacity: 1;
		}
	}
	img {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
	}
</style>
