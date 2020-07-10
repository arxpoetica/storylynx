<div class="lynx-admin-layout scheme-{$color_scheme}">
	<AdminHeader/>
	<div class="body" class:fullwidth={$fullwidth}>
		<AdminBar/>
		<div class="content-view">
			<slot></slot>
		</div>
	</div>
</div>
<AssetPreview/>
<SavePanel/>

<script>
	import { onMount, getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session, page } = get_sapper_stores()

	import AdminHeader from './AdminHeader.svelte'
	import AdminBar from './AdminBar.svelte'
	import SavePanel from './SavePanel.svelte'
	import AssetPreview from './AssetPreview.svelte'
	// $: admin = $session.user

	import { color_scheme } from '../../../../stores/app-store.js'
	import { fullwidth } from '../../../../stores/admin-store.js'

	// DOM ONLY STUFF ---------- >>>>
	let html
	// this delay removes the `preload` class from the `html` element
	onMount(async () => setTimeout(() => html = document.querySelector('html'), 150))
	$: section = $page.path.split('/')[1]
	$: section_page = Object.keys($page.params).length ? `${section}-${Object.keys($page.params).join('-')}` : section
	$: if (process.browser && html) { html.setAttribute('class', `${section}-section ${section_page}-page`) }
</script>

<style type="text/scss">
	@mixin sharedvars {}
	@media (prefers-color-scheme: light) { :root { @mixin lightmode {} } }
	.scheme-light { @mixin lightmode {} }
	// @media (prefers-color-scheme: dark) { :root { @mixin darkmode {} } }
	.scheme-dark { @mixin darkmode {} }

	.lynx-admin-layout {
		flex: 1;
		background-color: var(--admin-bg);
		color: var(--admin-text);
	}
	.body {
		display: grid;
		grid-template-columns: auto 275rem;
		grid-template-areas: "body nav";
		grid-gap: 20rem;
		width: 100%;
		max-width: var(--admin-layout-width);
		padding: 40rem 0;
		margin: 0 auto;
		&.fullwidth { max-width: none; }
	}
	.content-view {
		display: grid;
		grid-template-rows: auto 1fr;
		grid-area: body;
	}

	// TODO: put these all in a global CSS file
	// TODO: OR BETTER YET, break admin out into a second app WITHIN this app???
	:global(.lynx-admin-layout) :global {
		h1 {
			margin: 0;
			font: $light 24rem/1.2 $font;
			text-transform: none;
			letter-spacing: 0.05rem;
			color: var(--admin-color-4);
		}
		a {
			color: var(--admin-color-text);
		}
	}
</style>
