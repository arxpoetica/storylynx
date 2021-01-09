<Modal title={uploaded ? 'Uploaded Assets' : 'Upload Assets'} bind:open classes="fullscreen">
	<!-- <Errors {errors}/> -->
	{#if saving}
		<div class="saver">
			<Hourglass saving_text="uploading"/>
			<h2>Please wait.</h2>
			<p>Please wait while we finish the upload process.<br>This may take a few minutes.</p>
		</div>
	{:else if uploaded}
		<div class="uploader">
			<AssetPickerList assets={uploaded} picked={new Map()} can_pick={false}/>
			<Buttons classes="no-margin align-right">
				<Button label="Close" handler={() => open = false}/>
			</Buttons>
		</div>
	{:else}
		<div class="main">
			<Uppy bind:open bind:saving bind:uploaded {upload_only}/>
		</div>
	{/if}
</Modal>

<script>
	import Modal from '../../components/widgets/Modal.svelte'
	import Uppy from '../uppy/Uppy.svelte'
	import AssetPickerList from '../uppy/AssetPickerList.svelte'
	import Button from '../../components/elements/Button.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Hourglass from '../../components/widgets/Hourglass.svelte'
	// import Errors from '../../components/widgets/Errors.svelte'

	export let open
	let upload_only = true
	let saving = false
	let uploaded = false
</script>

<style type="text/scss">
	.main {
		display: grid;
		grid-template-rows: 1fr;
		height: 100%;
		width: 100%;
	}
	.saver {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		text-align: center;
		:global(.hourglass) {
			height: auto;
		}
	}
	.uploader {
		display: grid;
		grid-template-rows: 1fr auto;
		grid-gap: 40rem;
		height: 100%;
		:global(.picker-list) {
			height: auto;
		}
	}
</style>
