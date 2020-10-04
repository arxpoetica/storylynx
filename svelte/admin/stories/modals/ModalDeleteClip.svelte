<Modal title="Delete Clip" subtitle="Clip: {clip.slug}" bind:open {saving} saving_text="deleting">
	<Errors {errors}/>
	<p>Are you sure you want to delete this clip and all it's contents?</p>
	<p class="warning">THIS ACTION CANNOT BE UNDONE.</p>
	<Button label="I'm sure. Delete my clip." classes="alert" handler={delete_clip}/>
	<Button label="Cancel" handler={() => open = false}/>
</Modal>

<script>
	import { seq } from '../../../../stores/admin-store.js'

	export let clip
	export let open

	import Button from '../../components/elements/Button.svelte'
	import Modal from '../../components/widgets/Modal.svelte'
	import Errors from '../../components/widgets/Errors.svelte'

	import { POST } from '../../../../utils/loaders.js'

	let errors = []
	let saving = false
	async function delete_clip(index) {
		saving = true
		errors = []

		const res = await POST('/api/admin/stories/clip-delete.post', {
			clip_id: clip.id,
			style_id: clip.style ? clip.style.id : false,
			asset_bin_ids: clip.asset_bins.map(bin => bin.id),
			asset_ids: clip.asset_bins.map(bin => bin.assets.map(asset => asset.id)).flat(),
		})
		if (res.error) {
			alert('Something went wrong. The clip could not be deleted. Please contact the administrator of this site for assistance.')
			saving = false
			open = false
			return false
		}

		const deleted_index = $seq.clips.findIndex(deleted_clip => deleted_clip.id === clip.id)
		$seq.clips = $seq.clips.filter((clip, index) => index !== deleted_index)

		saving = false
		open = false
	}
</script>

<style type="text/scss">
	.warning {
		color: var(--admin-alert);
	}
</style>
