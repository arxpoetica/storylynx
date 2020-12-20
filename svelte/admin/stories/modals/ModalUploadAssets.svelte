<Modal title="Upload Assets" bind:open classes="fullscreen">
	<!-- <Errors {errors}/> -->
	<div class="main">
		<Uppy bind:open {upload_only}/>
	</div>
</Modal>

<script>
	import Modal from '../../components/widgets/Modal.svelte'
	import Uppy from '../uppy/Uppy.svelte'
	// import Errors from '../../components/widgets/Errors.svelte'

	export let data
	export let open
	let upload_only = true
</script>

<style type="text/scss">
	.main {
		display: grid;
		grid-template-rows: 1fr;
		height: 100%;
	}
</style>
