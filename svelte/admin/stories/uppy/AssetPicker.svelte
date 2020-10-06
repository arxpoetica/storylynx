<div class="picker">
	<div class="form">
		<Input label="Search" bind:value={search}/>
	</div>
	<div class="assets">
		{#each [...picked] as [key, asset] (key)}
			<AssetPickerRow bind:assets bind:picked {asset}/>
		{/each}
		{#each assets as asset (asset.id)}
			{#if !picked.has(asset.id)}
				<AssetPickerRow bind:assets bind:picked {asset}/>
			{/if}
		{/each}
	</div>
</div>

<script>
	import { POST } from '../../../../utils/loaders.js'
	import Input from '../../components/elements/Input.svelte'
	import AssetPickerRow from './AssetPickerRow.svelte'

	export let bin
	export let picked

	let assets = []
	$: asset_ids = bin.assets.map(asset => asset.id)

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
				column: 'published',
				sort: 'asc',
			})
		}, 400)
	}

	async function load_assets(payload) {
		const res = await POST('/api/admin/uppy/assets-page.post', payload)
		return res.assets
	}
</script>

<style type="text/scss">
	.picker {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
	}
	.form {
		margin: 0 3rem 40rem;
	}
	.assets {
		overflow: auto;
		height: 100%;
		@mixin scrollbar {}
		:global {
			.thumb {
				height: 50rem;
				background-color: var(--admin-accent-2);
			}
			.popup {
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
			}
		}
	}
</style>
