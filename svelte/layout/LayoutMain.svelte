<slot name="pre-site"></slot>
<div class="site">
	<slot name="pre-header"></slot>
	<slot name="header"><Header {section} navs={headernav}/></slot>
	<slot name="post-header"></slot>
	<div class="layout-{section} layout-all">
		<slot name="pre-main"></slot>
		<main class="layout-outer">
			<slot name="pre-inner"></slot>
			<div class="layout-inner">
				<slot></slot>
			</div>
			<slot name="post-inner"></slot>
		</main>
		<slot name="post-main"></slot>
	</div>
	<slot name="pre-footer"></slot>
	<slot name="footer"><Footer {section} navs={footernav} {copyright} {brands}/></slot>
	<slot name="post-footer"></slot>
</div>
<slot name="post-site"></slot>

<script>
	import { onMount, getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	import Header from './Header.svelte'
	import Footer from './Footer.svelte'

	export let headernav = [
		{ href: '/assets', text: 'Assets', state: 'assets', prefetch: true },
		{ href: '/posts', text: 'Posts', state: 'posts', prefetch: true },
		{ href: '/stories/main', text: 'Stories', state: 'stories', prefetch: true },
	]
	export let footernav = [
		{ href: '/terms', text: 'Terms &amp; Conditions', state: 'terms', prefetch: true },
		{ href: '/privacy', text: 'Privacy Policy', state: 'privacy', prefetch: true },
	]
	export let copyright = `Copyright &copy; ${(new Date()).getFullYear()} <br>${process.env.LYNX_SITE_NAME}`
	export let brands = []

	// DOM ONLY STUFF ---------- >>>>
	import { hyphenate } from '../../utils/basic-utils.js'
	let html
	// this delay removes the `preload` class from the `html` element
	onMount(async () => setTimeout(() => html = document.querySelector('html'), 150))
	$: section = $page.path === '/' ? 'home' : $page.path.split('/')[1]
	$: section_page = Object.keys($page.params).length ? `${section}-${Object.keys($page.params).join('-')}` : section
	$: if (process.browser && html) { html.setAttribute('class', `${section}-section ${section_page}-page`) }
</script>

<style type="text/scss">
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
		& :global(> header) {
			grid-row: header;
			grid-column: header;
		}
		& :global(> footer) {
			grid-row: footer;
			grid-column: footer;
		}
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
