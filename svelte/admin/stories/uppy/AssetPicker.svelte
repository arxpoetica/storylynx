<div class="actions">
	<div class="search">
		<Input label="Search" sublabel="Search by filename" bind:value={search}/>
	</div>
	<Buttons classes="no-margin align-right">
		<Button label="Upload New Assets" classes="blank plus" handler={() => upload = true}/>
	</Buttons>
</div>
<div class="columns">
	<div class="col">
		<AssetPickerList bind:assets bind:picked/>
	</div>
	<div class="col col-tiles">
		<div class="tiles">
			{#each [...picked] as [key, asset] (key)}
				<AssetPickerTile {asset} bind:assets bind:picked/>
			{/each}
		</div>
	</div>
</div>

<script>
	import { POST } from '../../../../utils/loaders.js'
	import AssetPickerList from './AssetPickerList.svelte'
	import AssetPickerTile from './AssetPickerTile.svelte'
	import Input from '../../components/elements/Input.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'

	export let existing_ids = []
	export let picked = new Map()
	let assets = []

	let search = ''
	let prior_search
	let timer
	$: if (search !== prior_search) {
		clearTimeout(timer)
		prior_search = search
		timer = setTimeout(async() => {
			assets = await load_assets({
				ids: [...existing_ids, ...[...picked].map(([key]) => key)],
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
</script>

<style type="text/scss">
	.actions {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
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
