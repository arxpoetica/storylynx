<div class:show class="bg-wrap">
	<img {src} alt="n/a" use:lazy/>
	<div class:show class="bg" {style}></div>
</div>

<script>
	export let src
	export let loaded = false
	let show = false

	$: style = `background-image:url(${src});`

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
		overflow: hidden;
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
