<div class="html-form rows">

	<div class="toolbar rows">
		<div class="row">
			<Input label="Name" bind:value={asset.name}/>
		</div>
		<div class="row">
			<Select
				label="HTML Template"
				bind:value={asset.template}
				options={$enums.html_templates}
			/>
		</div>
		<div class="row">
			<Select
				label="HTML Highlight Color"
				bind:value={asset.color}
				options={$enums.html_colors}
			/>
		</div>
	</div>


	<div class="html-editor">
		<!-- <button on:click={show}>Show HTML</button> -->
		<div id="editor-js" class="editor-js"></div>
		<Button label="Insert block" classes="small" handler={() => insert_block()}/>
	</div>

</div>

<script>
	export let asset
	// export let index

	import { onMount, onDestroy } from 'svelte'
	import { enums } from '../../../../stores/admin-store.js'
	import { code_to_html } from './html-utils.js'

	import Input from '../../components/elements/Input.svelte'
	import Select from '../../components/elements/Select.svelte'
	import Button from '../../components/elements/Button.svelte'
	import SimpleImageComponent from '../widgets/SimpleImageComponent.svelte'

	let editor
	let components = []

	onMount(async() => {
		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const List = (await import('@editorjs/list')).default
		const Quote = (await import('@editorjs/quote')).default
		const Delimiter = (await import('@editorjs/delimiter')).default
		const { ConstructSimpleImage } = await import('../widgets/SimpleImage.js')
		const SimpleImage = ConstructSimpleImage(SimpleImageComponent, components)

		window.editor = editor = new EditorJS({
			data: asset.code,
			holderId: 'editor-js',
			tools: {
				// https://github.com/editor-js/header
				header: {
					class: Header,
					config: {
						placeholder: 'Enter a header',
						levels: [1, 2, 3, 4, 5, 6],
						defaultLevel: 2,
					},
				},
				// https://github.com/editor-js/list
				list: List,
				quote: {
					class: Quote,
					inlineToolbar: true,
					// shortcut: 'CMD+SHIFT+O',
					config: {
						quotePlaceholder: 'Enter a quote',
						captionPlaceholder: 'Quote\'s author',
					},
				},
				delimiter: Delimiter,
				image: {
					class: SimpleImage,
				},
			},
			autofocus: true,
			onChange: async(api) => {
				asset.code = await api.saver.save()
				asset.html = code_to_html(asset.code)
			},
			logLevel: 'ERROR',
		})
	})

	function insert_block() {
		editor.blocks.insert('paragraph', null, null, editor.blocks.getBlocksCount(), true)
	}

	onDestroy(() => {
		if ((editor && editor.destroy) || components.length) {
			for (let comp of components) {
				comp.$destroy()
			}
			editor.destroy()
			editor = null
		}
	})
</script>

<style type="text/scss">
	.html-form {
		// display: flow-root;
		margin: 12rem 0 10rem 22rem;
		padding: 20rem;
		background-color: rgba(var(--admin-accent-0-rgb), 0.25);
		border-radius: 8rem;
	}
	// .html-editor {}
	// .toolbar {}
	.editor-js {
		margin: 0 0 10rem;
		:global {
			.ce-block {
				padding: 8rem;
				border-bottom: 1rem dashed var(--admin-color-2);
			}
			svg {
				height: auto;
				width: auto;
				flex: unset;
			}
			.codex-editor__redactor {
				margin: 0;
				padding-bottom: 0 !important;
			}
			.ce-block--selected .ce-block__content {
				background-color: transparent;
			}
			.codex-editor--narrow .ce-block--focused {
				margin: 0;
			}
			.cdx-quote {
				// margin: 50rem 0 0;
				// padding: 0 50rem;
				font: inherit;
				letter-spacing: inherit;
				text-transform: none;
				text-align: left;
				&:after {
					display: none;
				}
			}
		}
	}
</style>
