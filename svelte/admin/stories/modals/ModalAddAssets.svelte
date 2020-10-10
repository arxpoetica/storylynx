<Modal title="Add Assets" bind:open {saving} saving_text="adding" classes="fullscreen">
	<!-- <Errors {errors}/> -->
	<div class="main" class:upload>
		{#if upload}
			<Uppy/>
		{:else}
			<Buttons classes="no-margin align-right">
				<Button label="Upload New Assets" classes="blank plus" handler={() => upload = true}/>
			</Buttons>
			<AssetPicker bind:picked {existing_ids}/>
		{/if}
		<Buttons classes="no-margin align-right">
			<Button
				label="Add Asset{picked.size < 2 ? '' : 's'}"
				classes="good"
				disabled={!picked.size}
				handler={add_assets}
			/>
		</Buttons>
	</div>
</Modal>

<script>
	import { seq, preview_clip } from '../../../../stores/admin-store.js'
	import { POST } from '../../../../utils/loaders.js'
	import Modal from '../../components/widgets/Modal.svelte'
	import Uppy from '../uppy/Uppy.svelte'
	import AssetPicker from '../uppy/AssetPicker.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'
	// import Errors from '../../components/widgets/Errors.svelte'

	export let data
	export let open
	$: existing_ids = data.bin.assets.map(asset => asset.asset_id).filter(Boolean)

	let upload = false
	let picked = new Map()

	// let errors = []
	let saving = false
	async function add_assets() {
		saving = true
		// errors = []
		const assets_length = data.bin.assets.length
		const order_start = assets_length ? data.bin.assets[assets_length - 1].order : 0
		const assets = [...picked].map(([key], index) => {
			return { id: key, order: order_start + ((index + 1) * 10000) }
		})
		const res = await POST('/api/admin/uppy/assets-add.post', {
			bin_id: data.bin.id,
			assets,
		})
		if (res.error) {
			alert('Something went wrong. The assets could not be added. Please contact the administrator of this site for assistance.')
			saving = false
			open = false
			return false
		}

		$preview_clip.asset_bins[data.bin_index].assets = res.assets
		$seq.clips[data.clip_index].asset_bins[data.bin_index].assets = res.assets

		saving = false
		open = false
	}
</script>

<style type="text/scss">
	.main {
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: 100%;
		grid-gap: 40rem;
	}
</style>
