<svelte:window on:scroll={rejigger} on:resize={rejigger}/>
<div
	class="magnifier"
	bind:this={box}
	on:mousemove={mousemove}
	on:mouseenter={() => show = true}
	on:mouseleave={() => show = false}
>
	<slot></slot>
	{#if loaded}
		<div class:show class="view" style={view_style}>
			<div class="img" style={img_style}></div>
		</div>
	{/if}
</div>

<script>
	export let loaded
	export let src
	export let width
	export let height

	$: is_larger_than_max = width >= 2000 || height >= 2000
	$: is_wide = width >= height
	$: max_width = is_larger_than_max ? (is_wide ? 2000 : 2000 * width / height) : width
	$: max_height = is_larger_than_max ? (is_wide ? 2000 * height / width : 2000) : height

	let show = false
	let box
	$: bounds = box ? box.getBoundingClientRect() : false

	const mousemove = event => {
		view_x = event.clientX - bounds.left
		view_y = event.clientY - bounds.top
		bg_x = -(view_x / bounds.width * max_width)
		bg_y = -(view_y / bounds.height * max_height)
	}

	let view_x = 0
	let view_y = 0
	$: view_style = [
		'transform:',
		` translateX(${view_x}rem)`,
		` translateY(${view_y}rem);`,
	].join('')

	let bg_x = 0
	let bg_y = 0
	$: img_style = [
		`width:${max_width}rem;`,
		`height:${max_height}rem;`,
		'transform:',
		` translateX(${bg_x}rem)`,
		` translateY(${bg_y}rem);`,
		`background-image:url(${src});`,
	].join('')

	const rejigger = () => bounds = box.getBoundingClientRect()
</script>

<style type="text/scss">
	.magnifier {
		position: relative;
	}
	.view {
		overflow: hidden;
		position: absolute;
		top: -80rem;
		left: -80rem;
		width: 160rem;
		height: 160rem;
		background-color: $white;
		border-radius: 100%;
		transition: opacity 0.2s ease-in-out;
		opacity: 0;
		z-index: 2;
		pointer-events: none;
		&.show {
			opacity: 1;
		}
		&::after {
			content: '';
			display: block;
			position: absolute;
			top: -1px;
			right: -1px;
			bottom: -1px;
			left: -1px;
			border-radius: 100%;
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
			z-index: 4;
		}
	}
	.img {
		position: absolute;
		top: 80rem;
		left: 80rem;
		background: none no-repeat 0 0 transparent;
		background-size: contain;
		z-index: 3;
	}
</style>
