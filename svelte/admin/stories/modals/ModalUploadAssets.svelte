<Modal title={uploaded ? 'Uploaded Assets' : 'Upload Assets'} bind:open classes="fullscreen">
	<div class="main">
		<Uppy bind:open bind:uploaded upload_only={true}/>
	</div>
</Modal>

<script>
	import Modal from '../../components/widgets/Modal.svelte'
	import Uppy from '../uppy/Uppy.svelte'

	export let open
	let uploaded = false
</script>

<style type="text/scss">
	.main {
		display: grid;
		grid-template-rows: 1fr;
		height: 100%;
		width: 100%;
	}
</style>
