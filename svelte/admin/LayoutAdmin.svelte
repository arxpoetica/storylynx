<div class="admin-layout">
	<AdminBar/>
	<main>
		<slot></slot>
	</main>
</div>
<!-- {@html `<${'style'}>${QuillCss}</${'style'}>`} -->

<script>
	import { beforeUpdate, onMount, getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session, page } = get_sapper_stores()

	import AdminBar from './AdminBar.svelte'
	// $: admin = $session.user

	// DOM ONLY STUFF ---------- >>>>
	import { hyphenate } from '../../utils/basic-utils.js'
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
		--admin-gray-darker: #222;
		--admin-gray-dark: #333;
		--admin-gray-med: #888;
		--admin-gray-light: #bbb;
		--admin-gray-lighter: #e3e3e3;
		--admin-white: #fff;
		--admin-offwhite: #f3f3f3;
		--admin-blue: #1ac0ff;
		// --admin-links: #9dcbdd;
		--admin-font: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
	.admin-layout {
		display: grid;
		grid-template-columns: 250rem 1fr;
		flex: 1;
		background-color: var(--admin-gray-lighter);
		// TODO: put these all in a global CSS file
		:global {
			table {
				width: 100%;
				background-color: var(--admin-white);
				border-collapse: collapse;
				border-spacing: 0;
				border: 1px solid var(--admin-gray-light);
				font-family: inherit;
				line-height: 1.2;
			}
			thead, tfoot { tr { border: 1px solid var(--admin-gray-light); } }
			tbody tr:nth-child(odd) { background-color: var(--admin-offwhite); }
			th, td {
				padding: 8rem;
				text-align: left;
				vertical-align: middle;
			}
		}
	}
	main {
		display: grid;
		grid-template-areas:
			"header header"
			"main side"
		;
		grid-template-rows: auto 1fr;
		grid-template-columns: 1fr 300rem;
		min-height: 100%;
		& :global(.admin-header) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			grid-row: header;
			grid-column: header;
			padding: 20rem;
			// border-bottom: 1px solid $gray-6;
			:global(h1) {
				margin: 0;
				// font: $bold 18rem/1.2 $font;
			}
		}
		& :global(.admin-all) {
			grid-row: header / main;
			grid-column: main / side;
			padding: 20rem;
		}
		& :global(.admin-full) {
			grid-row: main;
			grid-column: main / side;
			padding: 20rem;
		}
		& :global(.admin-main) {
			grid-row: main;
			grid-column: main;
			padding: 20rem;
		}
		& :global(.admin-side) {
			// grid-row: header / side;
			grid-row: side;
			grid-column: side;
			// border-left: 1px solid $gray-6;
		}
	}
</style>
