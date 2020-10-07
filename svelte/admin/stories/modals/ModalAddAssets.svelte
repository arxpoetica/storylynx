<Modal title="Add Assets" bind:open {saving} saving_text="adding" classes="fullscreen">
	<!-- <Errors {errors}/> -->
	<div class="main">
		<div class="search">
			<Input label="Search" bind:value={search}/>
		</div>
		<div class="columns">
			<div class="col">
				{#if upload}
					<Uppy/>
				{:else}
					<AssetPicker bind:assets bind:picked/>
				{/if}
			</div>
			<div class="col col-tiles">
				<div class="tiles">
					{#each [...picked] as [key, asset] (key)}
						<AssetPickerTile {asset} bind:assets bind:picked/>
					{/each}
				</div>
			</div>
		</div>
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
	import AssetPickerTile from '../uppy/AssetPickerTile.svelte'
	import Input from '../../components/elements/Input.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'
	// import Errors from '../../components/widgets/Errors.svelte'

	export let data
	export let open

	let upload = false
	let assets = []
	$: asset_ids = data.bin.assets.map(asset => asset.asset_id).filter(Boolean)
 	let picked = new Map()

	let search = ''
	let prior_search
	let timer
	$: if (search !== prior_search) {
		clearTimeout(timer)
		prior_search = search
		timer = setTimeout(async() => {
			assets = await load_assets({
				ids: [...asset_ids, ...[...picked].map(([key]) => key)],
				search,
				page: 1,
				page_size: 50,
				column: 'created',
				sort: 'desc',
			})
		}, 400)
	}

	async function load_assets(payload) {
		const res = await POST('/api/admin/uppy/assets-page.post', payload)
		return res.assets
	}

	// let errors = []
	let saving = false
	async function add_assets() {
		saving = true
		// errors = []

		const order_start = data.bin.assets[data.bin.assets.length - 1].order
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
	.search {
		width: var(--admin-panel-width);
		margin: 0 3rem;
	}
	.columns {
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 40rem;
	}
	.col {
		overflow: hidden;
	}
	.col-tiles {
		overflow: auto;
		padding: 0 40rem 0 0;
		@mixin scrollbar {}
	}
	.tiles {
		display: grid;
		grid-gap: 40rem;
		grid-template-columns: repeat(auto-fill, minmax(150rem, 1fr));
	}
</style>
