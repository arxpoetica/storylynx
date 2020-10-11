<Modal title="Delete Asset Bin" bind:open {saving} saving_text="deleting">
	<Errors {errors}/>
	<p>Are you sure you want to delete this bin and all it's contents?</p>
	<p class="warning">THIS ACTION CANNOT BE UNDONE.</p>
	<Button label="I'm sure. Delete my bin." classes="alert" handler={delete_bin}/>
	<Button label="Cancel" handler={() => open = false}/>
</Modal>

<script>
	import { seq, preview_clip } from '../../../../stores/admin-store.js'

	export let data
	export let open

	import Button from '../../components/elements/Button.svelte'
	import Modal from '../../components/widgets/Modal.svelte'
	import Errors from '../../components/widgets/Errors.svelte'

	import { POST } from '../../../../utils/loaders.js'

	let errors = []
	let saving = false
	async function delete_bin() {
		saving = true
		errors = []

		const res = await POST('/api/admin/stories/bin-delete.post', {
			bin_id: data.bin.id,
			asset_ids: data.bin.assets.map(asset => asset.id),
		})
		if (res.error) {
			alert('Something went wrong. The clip could not be deleted. Please contact the administrator of this site for assistance.')
			saving = false
			open = false
			return false
		}

		$preview_clip.asset_bins = $preview_clip.asset_bins.filter(bin => bin.id !== data.bin.id)
		$seq.clips[data.clip_index].asset_bins
			= $seq.clips[data.clip_index].asset_bins.filter(bin => bin.id !== data.bin.id)

		saving = false
		open = false
	}
</script>

<style type="text/scss">
	.warning {
		color: var(--admin-alert);
	}
</style>
