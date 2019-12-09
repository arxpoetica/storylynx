<div class="site">
	<Header {section}/>
	<div class="layout-{section} layout-all">
		<main class="layout-outer">
			<div class="layout-inner">
				<slot></slot>
			</div>
		</main>
	</div>
	<Footer {section}/>
</div>

<script>
	import { onMount, getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	import Header from './Header.svelte'
	import Footer from './Footer.svelte'

	// DOM ONLY STUFF ---------- >>>>
	let html
	$: section = $page.path === '/' ? 'home' : $page.path.split('/')[1]
	let priorSection
	$: if (process.browser && html) {
		html.classList.remove(`${priorSection}-section`)
		html.classList.add(`${section}-section`)
		priorSection = section
	}

	onMount(async () => {
		html = document.querySelector('html')
		setTimeout(() => html.classList.remove('preloaded'), 150)
	})
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
