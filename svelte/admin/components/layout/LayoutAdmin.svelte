<div class="lynx-admin-layout scheme-{$color_scheme}">
	<AdminHeader/>
	<div class="body">
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

	// DOM ONLY STUFF ---------- >>>>
	let html
	// this delay removes the `preload` class from the `html` element
	onMount(async () => setTimeout(() => html = document.querySelector('html'), 150))
	$: section = $page.path.split('/')[1]
	$: section_page = Object.keys($page.params).length ? `${section}-${Object.keys($page.params).join('-')}` : section
	$: if (process.browser && html) { html.setAttribute('class', `${section}-section ${section_page}-page`) }
</script>

<style type="text/scss">

	// ============ >>>>> DARK MODE

	@define-mixin darkmode {
		--admin-bg: #38444c;
		--admin-bg-rgb: 56, 68, 76;

		--admin-accent-0: black;
		--admin-accent-0-rgb: 0, 0, 0;
		--admin-accent-1: #242c31;
		--admin-accent-1-rgb: 36, 44, 49;
		--admin-accent-2: #4a5a64;
		--admin-accent-3: #485358;
		--admin-accent-4: #74858d;
		--admin-accent-6: #97a7ad;
		--admin-accent-8: #adb7bc;
		--admin-accent-9: #c8cfd2;
		--admin-accent-10: #f6f9fc;
		--admin-shadow: 0 4rem 20rem rgba(0, 0, 0, 0.8);

		--admin-color-1: #21333d;
		--admin-color-1-rgb: 33, 51, 61;
		--admin-color-2: #2c698a;
		--admin-color-4: #4996c0;
		--admin-color-6: #6bb4db;
		--admin-color-8: #a1d3ee;
		--admin-color-10: #e2f0f7;
		--admin-color-text: var(--admin-color-8);

		--admin-text: #f0f2f3;
	}

	// ============ >>>>> LIGHT MODE

	@define-mixin lightmode {
		--admin-bg: #fff;
		--admin-bg-rgb: 255, 255, 255;

		--admin-accent-0: white;
		--admin-accent-0-rgb: var(--admin-bg-rgb);
		--admin-accent-1: #f4f6f6;
		--admin-accent-1-rgb: 244, 246, 246;
		--admin-accent-2: #dfe2e4;
		--admin-accent-3: #c8cfd2;
		--admin-accent-4: #adb7bc;
		--admin-accent-6: #97a7ad;
		--admin-accent-8: #74858d;
		--admin-accent-9: #485358;
		--admin-accent-10: #2e3539;
		--admin-shadow: 0 4rem 20rem rgba(0, 0, 0, 0.2);

		--admin-color-1: #e7f6fe;
		--admin-color-1-rgb: 231, 246, 254;
		--admin-color-2: #c0e8fc;
		--admin-color-4: #20aef6;
		--admin-color-6: #0995dd;
		--admin-color-8: #077bb5;
		--admin-color-10: #023955;
		--admin-color-text: var(--admin-color-8);

		--admin-text: var(--admin-accent-10);
	}

	:root {

		@mixin darkmode {} // default

		// ============ >>>>> SHARED (BOTH LIGHT AND DARK)

		--admin-good: #00ebc0;
		--admin-good-faint: #f0fffc;
		--admin-good-lighter: #99ffed;
		--admin-good-light: #66ffe3;
		--admin-good-dark: #00b292;
		--admin-good-darker: #007a64;
		--admin-good-dusk: #004d3f;
		--admin-good-text: var(--admin-good-dark);

		--admin-warn: #fcf08d;

		--admin-alert: #e7184a;
		--admin-alert-faint: #fef1f4;
		--admin-alert-light: #eb436b;
		--admin-alert-lighter: #f5a3b7;
		--admin-alert-dark: #bd143d;
		--admin-alert-darker: #941030;
		--admin-alert-dusk: #470011;
		--admin-alert-text: var(--admin-alert);

		--admin-link: var(--admin-color-6);
		--admin-font: 'Helvetica Neue', Helvetica, Arial, sans-serif;

		--admin-layout-width: 1280rem;

		--admin-z-index-top: 100;
	}

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
		padding: 20rem 0;
		max-width: var(--admin-layout-width);
		margin: 0 auto;
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
