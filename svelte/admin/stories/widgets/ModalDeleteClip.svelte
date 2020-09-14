<Modal title="Delete Clip" subtitle="Clip: {clip.slug}" bind:open {saving} saving_text="deleting">
	<Errors {errors}/>
	<p>Are you sure you want to delete this clip and all it's contents?</p>
	<p class="warning">THIS ACTION CANNOT BE UNDONE.</p>
	<Button title="I'm sure. Delete my clip." classes="alert" handler={delete_clip}/>
	<Button title="Cancel" handler={() => open = false}/>
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
			html_block_ids: clip.asset_bins.map(bin => bin.html_blocks.map(block => block.id)).flat(),
		})
		$seq.clips = $seq.clips.filter(clip => clip.id !== res.deleted_clip.id)

		saving = false
		open = false
	} 
</script>

<style type="text/scss">
	.warning {
		color: var(--admin-alert);
	}
</style>
