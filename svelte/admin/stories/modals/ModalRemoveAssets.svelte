<Modal title="Remove Media & HTML Assets" bind:open {saving} saving_text="removing">
	<Errors {errors}/>
	<p>Are you sure you want to remove these assets from this bin?</p>
	<p>NOTE: media assets are just disconnected and continue to exist in the archive.</p>
	<p class="warning-severe">However, HTML will be deleted and is not recoverable.</p>
	<p class="warning">THIS ACTION CANNOT BE UNDONE.</p>
	<Buttons classes="no-margin align-right">
		<Button label="Cancel" handler={() => open = false}/>
		<Button label="I'm sure. Remove these assets." classes="alert" handler={remove_assets}/>
	</Buttons>
</Modal>

<script>
	export let bin
	export let clip_index
	export let bin_index
	export let remove_ids
	export let open

	let errors = []
	let saving = false

	import { POST } from '../../../../utils/loaders.js'
	import { seq } from '../../../../stores/admin-store.js'

	import Button from '../../components/elements/Button.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Modal from '../../components/widgets/Modal.svelte'
	import Errors from '../../components/widgets/Errors.svelte'

	async function remove_assets() {
		saving = true
		errors = []

		console.log('removing assets!!!')
		const res = await POST('/api/admin/stories/assets-delete.post', { asset_ids: remove_ids })
		if (res.error) {
			alert('Something went wrong. The assets could not be removed. Please contact the administrator of this site for assistance.')
			saving = false
			open = false
			return false
		}

		bin.assets = bin.assets.filter(asset => !remove_ids.find(id => id === asset.id))
		$seq.clips[clip_index].asset_bins[bin_index].assets = bin.assets
		remove_ids = []

		saving = false
		open = false
	}
</script>

<style type="text/scss">
	.warning-severe {
		display: inline-block;
		padding: 3rem 5rem;
		background-color: var(--admin-alert);
		color: var(--admin-text);
	}
	.warning {
		color: var(--admin-alert);
	}
</style>
