<Modal
	title="Create Asset Bin"
	subtitle={''}
	bind:open
	{saving}
>
	<div class="contents rows">
		<div class="row">
			<p>Create a new asset bin?</p>
			<p>(This will be appended to the end of the clip.)</p>
		</div>
		<div class="row">
			<Errors {errors}/>
			<Buttons classes="no-margin align-right">
				<Button label="Yes, please." classes="good" handler={save}/>
			</Buttons>
		</div>
	</div>
</Modal>

<script>
	import { seq, preview_clip } from '../../../../stores/admin-store.js'

	export let data
	export let open

	import Modal from '../../components/widgets/Modal.svelte'
	import Button from '../../components/elements/Button.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Errors from '../../components/widgets/Errors.svelte'

	import { POST } from '../../../../utils/loaders.js'

	let errors = []
	let saving = false
	async function save() {
		saving = true
		errors = []

		const bin_length = data.clip.asset_bins.length
		const order = bin_length ? data.clip.asset_bins[bin_length - 1].order + 10000 : 10000

		const { asset_bin } = await POST('/api/admin/stories/bin-create.post', {
			clip_id: data.clip.id,
			order,
		})

		const new_bin = {
			id: asset_bin.id,
			order,
			assets: [],
			transition: null,
		}
		// only necessary if editing:
		if ($preview_clip) {
			$preview_clip.asset_bins = [...$preview_clip.asset_bins, new_bin]
		}
		$seq.clips[data.clip_index].asset_bins = [...$seq.clips[data.clip_index].asset_bins, new_bin]

		saving = false
		open = false
	}
</script>

<!-- <style type="text/scss"></style> -->
