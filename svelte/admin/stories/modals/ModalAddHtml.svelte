<Modal title="Add HTML Asset" bind:open {saving} saving_text="adding">
	<div class="main rows">
		<div class="row">
			<Input label="Name" sublabel="Give this HTML asset a name." bind:value={name} required={true} autofocus={true}/>
		</div>
		<div class="row">
			<Errors {errors}/>
			<Buttons classes="no-margin align-right">
				<Button label="Create HTML" classes="good" handler={save}/>
			</Buttons>
		</div>
	</div>
</Modal>

<script>
	import { seq, preview_clip } from '../../../../stores/admin-store.js'
	import { POST } from '../../../../utils/loaders.js'
	import Modal from '../../components/widgets/Modal.svelte'
	import Input from '../../components/elements/Input.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'
	import Errors from '../../components/widgets/Errors.svelte'
	import FastestValidator from 'fastest-validator'

	export let data
	export let open
	let name = ''

	let errors = []
	let saving = false
	const validator = (new FastestValidator()).compile({
		'Name': 'string|empty:false|min:3|max:250',
		$$strict: true,
	})

	async function save() {
		saving = true

		const valid = validator({ 'Name': name })
		if (valid !== true) {
			errors = valid
			saving = false
			return
		}

		errors = []
		const assets_length = data.bin.assets.length
		const order = assets_length ? data.bin.assets[assets_length - 1].order + 10000 : 10000

		const res = await POST('/api/admin/stories/html-create.post', {
			bin_id: data.bin.id,
			order,
			name,
		})
		if (res.error) {
			alert('Something went wrong. The HTML asset could not be added. Please contact the administrator of this site for assistance.')
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
	// .main {}
</style>
