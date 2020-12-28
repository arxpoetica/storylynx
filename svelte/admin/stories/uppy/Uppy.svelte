<div class="uppy-component">
	<div class="uppy" id="uppy-dashboard"></div>
	<Buttons classes="no-margin align-right">
		<Button label="Cancel" classes="blank warn" handler={cancel}/>
		<Button label="Upload Assets" classes="good" handler={start_upload} disabled={!uppy_files.length}/>
	</Buttons>
</div>

<script>
	import { onMount, onDestroy } from 'svelte'
	import { uppy_loaded } from '../../../../stores/admin-store.js'
	import { POST } from '../../../../utils/loaders.js'

	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'

	export let open
	export let upload = true
	export let upload_only
	let uppy
	let uppy_files = []

	async function start_upload() {
		uppy_files = uppy.getFiles()
		const url = '/api/admin/signed-urls.post'
		const signed_files = await POST(url, {
			files: uppy_files.map(file => {
				return { name: file.name, type: file.type }
			}),
		})
		for (const file of uppy_files) {
			const found = signed_files.find(signed => signed.name === file.name)
			file.signed_url = found.url
		}
		const res = await uppy.upload()
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
		const AwsS3 = (await import('@uppy/aws-s3')).default
		const Webcam = (await import('@uppy/webcam')).default
		const ImageEditor = (await import('@uppy/image-editor')).default
		const ProgressBar = (await import('@uppy/progress-bar')).default
		const GoldenRetriever = (await import('@uppy/golden-retriever')).default

		const { classList } = document.querySelector('.lynx-admin-layout')
		let theme = 'light'
		if (
			classList.contains('scheme-auto')
			&& matchMedia('(prefers-color-scheme: dark)').matches
			|| classList.contains('scheme-dark')
		) { theme = 'dark' }

		uppy = new Uppy({
			// id: 'uppyUpload',
			debug: true,
			autoProceed: false,
			restrictions: {
				maxFileSize: 25000000,
				maxNumberOfFiles: 100,
				// minNumberOfFiles: null,
				allowedFileTypes: ['image/*', 'audio/*', 'video/*']
			},
			// logger: Uppy.debugLogger,
		})
			.use(Dashboard, {
				target: '#uppy-dashboard',
				inline: true,
				showProgressDetails: true,
				// showLinkToFileUploadResult: false,
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
			.use(AwsS3, {
				getUploadParameters: async(file) => ({
					method: 'PUT',
					url: file.signed_url,
					fields: {},
					headers: { 'Content-Type': file.type },
				}),
			})
			.use(Webcam, {
				target: Dashboard,
				// countdown: true,
				showRecordingLength: true,
				// preferredVideoMimeType: ['video/mp4'],
			})
			.use(ImageEditor, { target: Dashboard })
			.use(ProgressBar, { fixed: true })
			.use(GoldenRetriever, { serviceWorker: false })

		// TODO: hook up a service worker in the main storylynx template
		// SEE: https://uppy.io/docs/golden-retriever/#Usage
		// navigator.serviceWorker
		// 	.register('/sw.js') // path to your bundled service worker with GoldenRetriever service worker
		// 	.then(registration => console.log('ServiceWorker registration successful with scope: ', registration.scope))
		// 	.catch(error => console.log('Registration failed with ' + error))

		uppy
			.on('file-added', () => uppy_files = uppy.getFiles())
			.on('file-removed', () => uppy_files = uppy.getFiles())
			.on('complete', result => open = false)

	})

	onDestroy(() => {
		if (uppy) {
			uppy.close()
			uppy = null
		}
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
			.uppy-Root svg {
				width: auto;
				height: auto;
			}
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
