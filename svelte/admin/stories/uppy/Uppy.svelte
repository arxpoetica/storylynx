<div class="uppy" id="uppy-dashboard"></div>
<!-- <button class="UppyModalOpenerBtn">Upload</button> -->

<script>
	import { onMount, onDestroy } from 'svelte'
	import { uppy_loaded } from '../../../../stores/admin-store.js'
	// import { code_to_html } from './html-utils.js'

	// import Input from '../../components/elements/Input.svelte'
	// import Select from '../../components/elements/Select.svelte'
	// import Button from '../../components/elements/Button.svelte'
	// import SimpleImageComponent from '../widgets/SimpleImageComponent.svelte'

	let uppy
	// let components = []

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

		// // And their styles (for UI plugins)
		// // With webpack and `style-loader`, you can require them like this:
		// require('@uppy/core/dist/style.css')
		// require('@uppy/dashboard/dist/style.css')

		// const uppy = new Uppy()
		// 	.use(Dashboard, { trigger: '#select-files' })
		// 	.use(XHRUpload, { endpoint: 'https://api2.transloadit.com' })
		// uppy.on('complete', (result) => {
		// 	console.log('Upload complete! We’ve uploaded these files:', result.successful)
		// })


		const Uppy = (await import('@uppy/core')).default
		// const XHRUpload = (await import('@uppy/xhr-upload')).default
		const Dashboard = (await import('@uppy/dashboard')).default
		const GoogleDrive = (await import('@uppy/google-drive')).default
		const Dropbox = (await import('@uppy/dropbox')).default
		const Instagram = (await import('@uppy/instagram')).default
		const Facebook = (await import('@uppy/facebook')).default
		const Webcam = (await import('@uppy/webcam')).default
		const ImageEditor = (await import('@uppy/image-editor')).default
		// const Tus = (await import('@uppy/tus')).default

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
		})
			.use(Dashboard, {
				target: '#uppy-dashboard',
				inline: true,
				showProgressDetails: true,
				note: 'Files limited to 25 MB in size.',
				height: 450,
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
		// 	.use(Tus, { endpoint: 'https://master.tus.io/files/' })

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
	.uppy {
		:global {
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
