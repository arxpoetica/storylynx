<svelte:window bind:scrollY={scroll_y}/>

<!-- <div class="scroll">scroll_y: {scroll_y} | story_scroll: {$story_scroll} | forward: {$forward}</div> -->

<slot name="pre-site"></slot>
<div class="site">
	<slot name="header"><StoryHeader/></slot>
	<main class="layout-{section} layout-all">
		<slot name="pre-main"></slot>
			<slot></slot>
		<slot name="post-main"></slot>
	</main>
	<slot name="footer"></slot>
</div>
<slot name="post-site"></slot>

<script>
	import { onMount, getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	import StoryHeader from './StoryHeader.svelte'
	import { story_scroll, forward } from '../../../stores/story-store.js'

	let scroll_y = 0
	$: story_scroll.set(scroll_y)

	let old_scroll_y = 0
	$: if (old_scroll_y !== scroll_y) {
		forward.set(old_scroll_y < scroll_y)
		old_scroll_y = scroll_y
	}

	// DOM ONLY STUFF ---------- >>>>
	let html
	// this delay removes the `preload` class from the `html` element
	onMount(async () => setTimeout(() => html = document.querySelector('html'), 150))
	$: section = $page.path === '/' ? 'home' : $page.path.split('/')[1]
	$: section_page = Object.keys($page.params).length ? `${section}-${Object.keys($page.params).join('-')}` : section
	$: if (process.browser && html) { html.setAttribute('class', `${section}-section ${section_page}-page`) }
</script>

<style type="text/scss">
	// .scroll {
	// 	position: fixed;
	// 	top: 0;
	// 	right: 0;
	// 	padding: 10rem;
	// 	background-color: red;
	// 	color: white;
	// 	z-index: 999999999999;
	// }
	.site {
		display: grid;
		grid-template-areas:
			"header"
			"main"
			"footer"
		;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 1fr;
		flex: 1;
	}
	.layout-all {
		display: grid;
		grid-template-areas:
			"top"
			"bottom";
		grid-template-rows: 1fr auto;
		grid-template-columns: 1fr;
		// flex: 1;
		grid-row: main;
		grid-column: main;
		margin: 0 auto;
		width: 100%;
	}
	// .layout-outer {
	// 	grid-row: top;
	// }
	.layout-inner {
		height: 100%;
	}
</style>
