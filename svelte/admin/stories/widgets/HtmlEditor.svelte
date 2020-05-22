<!-- <button on:click={show}>Show HTML</button> -->
<div id="editor-js" class="editor-js"></div>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<script>
	export let data = {}
	let editor
	let components = []

	import SimpleImageComponent from './SimpleImageComponent.svelte'

	import { onMount, onDestroy } from 'svelte'
	onMount(async() => {
		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const List = (await import('@editorjs/list')).default
		const { ConstructSimpleImage } = await import('./SimpleImage.js')
		const SimpleImage = ConstructSimpleImage(SimpleImageComponent, components)

		window.editor = editor = new EditorJS({
			data,
			holderId: 'editor-js',
			tools: {
				// https://github.com/editor-js/header
				header: {
					class: Header,
					config: {
						placeholder: 'Enter a header',
						levels: [1, 2, 3],
						defaultLevel: 2,
					},
				},
				// https://github.com/editor-js/list
				list: List,
				image: {
					class: SimpleImage,
				},
			},
			autofocus: true,
			onChange: async(api) => {
				console.log('Now I know that Editor\'s content changed!')
				console.log(api)
				const data = await api.saver.save()
				console.log(data)
				debugger
			},
			logLevel: 'ERROR',

		})
	})

	async function show() {
		const data = await editor.save()
	}

	// // import { saveable, hot, hot_loaded, hot_changes } from '../../../../stores/admin-store.js'
	// import { onMount, onDestroy } from 'svelte'

	onDestroy(() => {
		// if ($hot) {
		// 	$hot.destroy()
		// 	$hot = null
		// }
		if ((editor && editor.destroy) || components.length) {
			for (let comp of components) {
				comp.$destroy()
			}
			editor.destroy()
		}
	})
</script>

<style type="text/scss">
	.editor-js {
		max-width: 850rem;
		padding: 100rem;
		border: 1rem solid var(--admin-gray-light);
		box-shadow: 0rem 2rem 8rem rgba(0, 0, 0, 0.15);
		background-color: #fafafa;
		:global {
			.ce-block {
				padding-left: 8rem;
				padding-right: 8rem;
				background-color: white;
				border: 1rem solid var(--admin-gray-light);
				border-bottom: 0;
				&:last-child {
					border-bottom: 1rem solid var(--admin-gray-light);
				}
			}
			svg {
				// flex: 1;
				// vertical-align: middle;
				height: auto;
				width: auto;
			}
			// h1, h2, h3, h4 { margin: 0; }
			.codex-editor__redactor {
				padding-bottom: 0 !important;
			}
		}
	}
</style>
