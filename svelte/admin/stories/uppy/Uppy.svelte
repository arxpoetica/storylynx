<div class="uppy-component">
	<div class="uppy" id="uppy-dashboard"></div>
	<Buttons classes="no-margin align-right">
		<Button label="Cancel" classes="blank warn" handler={cancel}/>
		<Button label="Upload Assets" classes="good" handler={start_upload}/>
	</Buttons>
</div>

<!-- <button class="UppyModalOpenerBtn">Upload</button> -->

<script>
	import { onMount, onDestroy } from 'svelte'
	import { uppy_loaded } from '../../../../stores/admin-store.js'
	// import { code_to_html } from './html-utils.js'

	// import Input from '../../components/elements/Input.svelte'
	// import Select from '../../components/elements/Select.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'
	// import SimpleImageComponent from '../widgets/SimpleImageComponent.svelte'

	export let open
	export let upload = true
	export let upload_only
	let uppy
	// let files = new Set()
	// let components = []

	async function start_upload() {
		// const files = uppy.getFiles()
		// console.log(files)
		// debugger
		// // const res = await uppy.upload()
		// // console.log(res)
	}
	function cancel() {
		if (upload_only) { open = false }
		upload = false
	}

	onMount(async() => {
		if (!$uppy_loaded) {
			await new Promise(resolve => {
				const link = document.createElement('link')
				link.href = '//transloadit.edgly.net/releases/uppy/v1.21.2/uppy.min.css'
				link.rel = 'stylesheet'
				link.onload = () => resolve()
				document.head.appendChild(link)
			})
			$uppy_loaded = true
		}

		const Uppy = (await import('@uppy/core')).default
		const Dashboard = (await import('@uppy/dashboard')).default
		const GoogleDrive = (await import('@uppy/google-drive')).default
		const Dropbox = (await import('@uppy/dropbox')).default
		const Instagram = (await import('@uppy/instagram')).default
		const Facebook = (await import('@uppy/facebook')).default
		const Webcam = (await import('@uppy/webcam')).default
		const ImageEditor = (await import('@uppy/image-editor')).default
		const XHRUpload = (await import('@uppy/xhr-upload')).default

		const { classList } = document.querySelector('.lynx-admin-layout')
		let theme = 'light'
		if (
			classList.contains('scheme-auto')
			&& matchMedia('(prefers-color-scheme: dark)').matches
			|| classList.contains('scheme-dark')
		) { theme = 'dark' }

		window.uppy = uppy = new Uppy({
			debug: true,
			autoProceed: false,
			restrictions: {
				maxFileSize: 25000000,
				// maxNumberOfFiles: 50,
				// allowedFileTypes: ['image/*', 'video/*']
			},
			// // see: https://github.com/transloadit/uppy/tree/master/packages/%40uppy/store-default
			// store: new (class SvelteStore {
			// 	constructor () {
			// 		this.state = {}
			// 		this.callbacks = []
			// 	}
			// 	getState() {
			// 		return this.state
			// 	}
			// 	setState(patch) {
			// 		const prevState = Object.assign({}, this.state)
			// 		const nextState = Object.assign({}, this.state, patch)
			// 		this.state = nextState
			// 		console.log(Object.entries(this.state.files))
			// 		// this.state.files.forEach(file => console.log(file))
			// 		// console.log(JSON.stringify(this.state.files, null, 2))
			// 		this._publish(prevState, nextState, patch)
			// 	}
			// 	subscribe(listener) {
			// 		this.callbacks.push(listener)
			// 		return () => {
			// 			// Remove the listener.
			// 			this.callbacks.splice(this.callbacks.indexOf(listener), 1)
			// 		}
			// 	}
			// 	_publish(...args) {
			// 		this.callbacks.forEach((listener) => listener(...args))
			// 	}
			// })(),
		})
			.use(Dashboard, {
				target: '#uppy-dashboard',
				inline: true,
				showProgressDetails: true,
				note: 'Files limited to 25 MB in size.',
				width: '100%',
				height: '100%',
				hideUploadButton: true,
				metaFields: [
					{ id: 'name', name: 'Name', placeholder: 'file name' },
					{ id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
				],
				theme,
			})
			.use(GoogleDrive, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
			.use(Dropbox, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
			.use(Instagram, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
			.use(Facebook, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
			.use(Webcam, { target: Dashboard })
			.use(ImageEditor, { target: Dashboard })
			.use(XHRUpload, {
				endpoint: process.env.LYNX_HOST + '/api/admin/uppy/assets-upload.post',
			})

		uppy.on('complete', result => {
			console.log('successful files:', result.successful)
			console.log('failed files:', result.failed)
		})

	})

	// function insert_block() {
	// 	editor.blocks.insert('paragraph', null, null, editor.blocks.getBlocksCount(), true)
	// }

	onDestroy(() => {
		// if ((editor && editor.destroy) || components.length) {
		// 	for (let comp of components) {
		// 		comp.$destroy()
		// 	}
		// 	editor.destroy()
		// 	editor = null
		// }


		// if ($hot) {
		// 	$hot.destroy()
		// 	$hot = null
		// }

	})
</script>

<style type="text/scss">
	.uppy-component {
		overflow: hidden;
		display: grid;
		grid-template-rows: 1fr auto;
		grid-gap: 40rem;
		height: 100%;
	}
	.uppy {
		overflow: hidden;
		:global {
			.uppy-Root { height: 100%; }
			.uppy-Dashboard-inner {
				background-color: transparent;
				border-color: var(--admin-accent-4);
			}
			.uppy-Dashboard-AddFiles {
				border-color: var(--admin-accent-4);
			}
			.uppy-DashboardTab-btn:hover {
				background-color: var(--admin-bg);
			}
			.uppy-Dashboard-poweredByIcon {
				width: 11rem;
				height: 11rem;
			}
			.uppy-size--md .uppy-Dashboard-AddFiles-title {
				max-width: none;
			}
		}
	}
</style>
