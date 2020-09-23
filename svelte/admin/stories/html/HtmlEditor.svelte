<div class="html-editor">
	<!-- <button on:click={show}>Show HTML</button> -->
	<div class="toolbar">
		<!-- FIXME: make these components -->
		<input type="text" bind:value={name} placeholder="Give this HTML group a name..."/>
		<select bind:value={template}>
			<option value="">Select an HTML template (leave blank for default)</option>
			{#each $enums.html_templates as template}
				<option value={template}>{template}</option>
			{/each}
		</select>
		<select bind:value={color}>
			<option value="">Select a highlight color (leave blank for no color)</option>
			{#each $enums.html_colors as color}
				<option value={color}>{color}</option>
			{/each}
		</select>
	</div>

	<div id="editor-js" class="editor-js"></div>
	<Button title="Insert block" classes="small" handler={() => insert_block()}/>
	<div class="buttons">
		<Button title="Cancel" classes="blank" handler={() => cancel(backup)}/>
		<Button title="Save HTML" classes="good" handler={() => save(data)}/>
	</div>
	<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
</div>

<script>
	export let name = ''
	export let template = ''
	export let color = ''
	export let data = {}
	export let save = () => {}
	export let update = () => {}
	export let cancel = () => {}

	import { onMount, onDestroy } from 'svelte'
	import { enums } from '../../../../stores/admin-store.js'

	import Button from '../../components/elements/Button.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import SimpleImageComponent from '../widgets/SimpleImageComponent.svelte'

	let editor
	let components = []
	let backup

	onMount(async() => {
		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const List = (await import('@editorjs/list')).default
		const Quote = (await import('@editorjs/quote')).default
		const Delimiter = (await import('@editorjs/delimiter')).default
		const { ConstructSimpleImage } = await import('../widgets/SimpleImage.js')
		const SimpleImage = ConstructSimpleImage(SimpleImageComponent, components)

		backup = JSON.parse(JSON.stringify(data))
		window.editor = editor = new EditorJS({
			data,
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
				data = await api.saver.save()
				update(data)
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
	.html-editor {
		overflow: auto;
		position: fixed;
		top: 136rem;
		bottom: 0;
		left: 0;
		padding: 75rem;
		width: calc(50% - 147rem);
		border: 1rem solid var(--admin-accent-0);
		box-shadow: var(--admin-shadow);
		background-color: var(--admin-bg);
		z-index: 1;
		@mixin scrollbar {}
	}
	.toolbar {
		margin: 0 0 20rem;
	}
	input,
	select {
		margin: 0 0 10rem;
		background-color: var(--admin-bg);
		border: 1rem solid var(--admin-accent-3);
		color: var(--admin-text);
		font: 14rem var(--admin-font);
	}
	.buttons {
		display: flex;
		justify-content: flex-end;
		margin: 75rem 0 0;
		:global(.button) {
			margin: 0 0 0 20rem;
		}
	}
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
