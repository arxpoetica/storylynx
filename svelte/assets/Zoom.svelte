<svelte:window
	bind:innerWidth
	bind:innerHeight
	on:scroll={rejigger}
	on:resize={rejigger}
	on:keydown={keydown}
	on:mouseup={mouseup}
	on:mousemove={mousemove}
/>

<div class:zoomshow class="zoom zoom-{zoom_level}" style={zoom_style}>
	<div class="bg" on:click={() => zoomshow = false}>
		<div class="close h6">
			<div class="svg">
				<Close/>
			</div>
			Close
		</div>
		<div class="zoomer h6" on:click={event => toggle_zoom(event)}>
			Zoom {zoom_level === 1 ? 'in' : 'out'}
			<div class="svg">
				{#if zoom_level === 1}
					<ZoomIn/>
				{:else}
					<ZoomOut/>
				{/if}
			</div>
		</div>
	</div>
	<div class="shell" on:contextmenu={event => event.preventDefault()}>
		<div bind:this={box} class="box" on:mousedown={event => mousedown(event)}>
			<div class="pan" style={pan_style}>
				<LazyImg {src} {alt} {width} {height}/>
				<!-- <LazyImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg/2560px-Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg" {alt} {width} {height}/> -->
			</div>
		</div>
	</div>
</div>

<script>
	import Close from '../svg/icon-close.svelte'
	import ZoomIn from '../svg/zoom-in.svelte'
	import ZoomOut from '../svg/zoom-out.svelte'
	import LazyImg from '../LazyImg.svelte'

	export let zoomshow = false

	export let src
	export let alt = 'No information present about this image.'
	export let width = 100
	export let height = 100

	let box
	$: bounds = box ? box.getBoundingClientRect() : false

	let grabbing = false
	let start_x = 0
	let start_y = 0
	let prev_translateX
	let prev_translateY
	const mousedown = event => {
		if (zoomshow) {
			grabbing = true
			start_x = event.clientX
			start_y = event.clientY
			prev_translateX = translateX
			prev_translateY = translateY
		}
	}
	const mouseup = () => grabbing = false
	const mousemove = event => {
		if (grabbing) {
			const move_x = start_x - event.clientX
			const new_x = prev_translateX - move_x
			const left_edge = bounds.width - width
			translateX = new_x > 0 ? 0 : (new_x < left_edge ? left_edge : new_x)

			const move_y = start_y - event.clientY
			const new_y = prev_translateY - move_y
			const bottom_edge = bounds.height - height
			translateY = new_y > 0 ? 0 : (new_y < bottom_edge ? bottom_edge : new_y)
		}
	}

	const center = (measure, boundary) => (measure - boundary) / 2 * -1
	let translateX = 0
	let translateY = 0

	let zoom_level = 1
	$: if (zoomshow) {
		translateX = center(width, bounds.width)
		translateY = center(height, bounds.height)
	} else {
		zoom_level = 1
	}

	let innerWidth = 0
	let innerHeight = 0
	let ratio1 = 0
	let ratio2 = 0
	let pillarbox
	let padding = 0
	$: if (zoom_level === 1) {
		const zoom_width = innerWidth - 150
		const zoom_height = innerHeight - 150
		ratio1 = width / height
		ratio2 = zoom_width / zoom_height
		pillarbox = ratio1 < ratio2
		if (pillarbox) {
			padding = (zoom_width - (zoom_height * ratio1)) / 2
		} else {
			padding = 0
		}
	}

	$: zoom_style = zoom_level === 1 ? 'justify-content:center;align-items:center;' : ''
	$: pan_style
		= zoom_level === 1
		? [
			'bottom:0;right:0;',
			`padding:0 ${padding}rem;`,
		].join('')
		: [
			`width:${width}rem;`,
			`height:${height}rem;`,
			'transform:',
			` translateX(${translateX}rem)`,
			` translateY(${translateY}rem)`,
			';',
		].join('')

	const rejigger = () => bounds = box.getBoundingClientRect()

	const keydown = event => {
		if (zoomshow && event.key === 'Escape') {
			zoomshow = false
		}
	}

	const toggle_zoom = event => {
		event.stopPropagation()
		zoom_level = zoom_level === 1 ? 2 : 1
	}
</script>

<style type="text/scss">
	.zoom {
		display: flex;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		padding: 65rem;
		// background-color: rgba(255, 255, 255, 0.8);
		background-color: $white;
		opacity: 0;
		z-index: $z-back-modal;
		pointer-events: none;
		&.zoomshow {
			opacity: 1;
			transition: opacity 0.25s ease-in-out;
			pointer-events: all;
		}
	}
	.bg {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 25rem;
		z-index: 1;
	}
	.close,
	.zoomer {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
	}
	.svg {
		width: 21rem;
		height: 21rem;
		margin-right: 10rem;
	}
	.zoomer .svg {
		margin: 0 0 0 10rem;
	}
	.shell {
		overflow: hidden;
		display: flex;
		position: relative;
		width: 100%;
		max-height: 100%;
		background-color: $white;
		border: 10rem solid $white;
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
		z-index: 2;
	}
	.box {
		flex: 1;
		overflow: hidden;
		cursor: grab;
		.zoom-1 & {
			cursor: default;
		}
	}
	.pan {
		position: relative;
		top: 0;
		left: 0;
		transform: translateX(0) translateY(0);
		// transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}
</style>
