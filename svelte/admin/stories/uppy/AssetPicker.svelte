<div class="picker">
	<div class="search">
		<Input label="Search" sublabel="Enter part or all of the filename." bind:value={search}/>
	</div>
	<div class="columns">
		<div class="col">
			{#if loading}
				<Hourglass bind:loading/>
			{:else}
				<AssetPickerList bind:assets bind:picked/>
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
			{handler}
		/>
	</Buttons>
</div>

<script>
	import { POST } from '../../../../utils/loaders.js'
	import AssetPickerList from './AssetPickerList.svelte'
	import AssetPickerTile from './AssetPickerTile.svelte'
	import Hourglass from '../../components/widgets/Hourglass.svelte'
	import Input from '../../components/elements/Input.svelte'
	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'

	export let existing_ids = []
	export let picked = new Map()
	export let handler = () => {}
	let assets = []
	let loading = true

	let search = ''
	let prior_search
	let timer
	$: if (search !== prior_search) {
		loading = true
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
			loading = false
		}, 400)
	}

	async function load_assets(payload) {
		const res = await POST('/api/admin/uppy/assets-page.post', payload)
		return res.assets
	}
</script>

<style type="text/scss">
	.picker {
		overflow: hidden;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-gap: 20rem;
		height: 100%;
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
