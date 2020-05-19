<div class="lynx-admin-layout">
	<AdminBar/>
	<slot></slot>
</div>
<SavePanel/>
<!-- {@html `<${'style'}>${QuillCss}</${'style'}>`} -->

<script>
	import { beforeUpdate, onMount, getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session, page } = get_sapper_stores()

	import AdminBar from './AdminBar.svelte'
	import SavePanel from './SavePanel.svelte'
	// $: admin = $session.user

	// DOM ONLY STUFF ---------- >>>>
	import { hyphenate } from '../../../../utils/basic-utils.js'
	let html
	// this delay removes the `preload` class from the `html` element
	onMount(async () => setTimeout(() => html = document.querySelector('html'), 150))
	$: section = $page.path.split('/')[1]
	$: section_page = Object.keys($page.params).length ? `${section}-${Object.keys($page.params).join('-')}` : section
	$: if (process.browser && html) { html.setAttribute('class', `${section}-section ${section_page}-page`) }

	// import { QuillCss } from './_components/QuillCss'
	// import { Quill } from '@johnny/stores/admin-store'
	beforeUpdate(async() => {
		// if (!$Quill) {
		// 	const ImportedQuill = (await import('quill/dist/quill.js')).default
		// 	ImportedQuill.prototype.setHTML = function(html) {
		// 		this.root.innerHTML = html
		// 	}
		// 	ImportedQuill.prototype.getHTML = function() {
		// 		return this.root.innerHTML
		// 	}
		// 	Quill.set(ImportedQuill)
		// }
	})
</script>

<style type="text/scss">
	:root {
		--admin-black: #000;
		--admin-white: #fff;
		--admin-offwhite: #f3f3f3;

		--admin-gray-darker: #2e3539;
		--admin-gray-dark: #485358;
		--admin-gray: #74858d;
		--admin-gray-med: #adb7bc;
		--admin-gray-med-light: #c8cfd2;
		--admin-gray-light: #dfe2e4;
		--admin-gray-lighter: #f4f6f6;

		--admin-blue: #0995dd;
		--admin-blue-faint: #e7f6fe;
		--admin-blue-lighter: #c0e8fc;
		--admin-blue-light: #20aef6;
		--admin-blue-dark: #077bb5;
		--admin-blue-dusk: #023955;
		--admin-blue-text: var(--admin-blue-dark);

		--admin-green: #00ebc0;
		--admin-green-faint: #f0fffc;
		--admin-green-lighter: #99ffed;
		--admin-green-light: #66ffe3;
		--admin-green-dark: #00b292;
		--admin-green-darker: #007a64;
		--admin-green-dusk: #004d3f;
		--admin-green-text: var(--admin-green-dark);

		--admin-red: #ff50a2;
		--admin-red-light: #ff88bf;
		--admin-red-dark: #d11b70;
		--admin-red-text: #ffeef5;

		--admin-text: var(--admin-gray-darker);
		--admin-link: var(--admin-blue);
		--admin-font: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
	.lynx-admin-layout {
		display: grid;
		grid-template-columns: 250rem 1fr;
		flex: 1;
		background-color: white;
	}
	// TODO: put these all in a global CSS file
	// TODO: OR BETTER YET, break admin out into a second app WITHIN this app???
	:global(.lynx-admin-layout) :global {
		h1 {
			margin: 0;
			font: $light 24rem/1.2 $font;
			text-transform: none;
			letter-spacing: 0.05rem;
			color: var(--admin-blue-light);
		}
		a {
			color: var(--admin-blue-text);
		}
	}

	// .admin-all {
	// 	grid-row: header / main;
	// 	grid-column: main / side;
	// 	padding: 20rem;
	// }
	// .admin-main {
	// 	grid-row: main;
	// 	grid-column: main;
	// 	padding: 20rem;
	// }
	// .admin-side {
	// 	// grid-row: header / side;
	// 	grid-row: side;
	// 	grid-column: side;
	// 	// border-left: 1px solid $gray-6;
	// }
</style>
