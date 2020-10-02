<div
	bind:this={elem}
	id="{asset.id}_{index}_{asset.order}"
	class="asset-row"
	class:remove

	on:mousedown={() => draggable = true}
	on:mouseup={() => draggable = false}

	{draggable}
	on:dragstart={event => dragging = dragstart(event, elem, !draggable)}
	on:dragover={event => dragover(event, elem, !draggable)}
	on:dragend={dragend}
	class:dragging
>
	<div class="header" on:click={() => editing = !editing}>
		<AssetThumb {asset}/>
		<h3><span>{asset.filename || asset.name || `Unnamed asset ${asset.order}`}</span></h3>
		<div class="actions">
			<Checkbox classes="alert" bind:checked={remove}/>
		</div>
	</div>
	{#if editing && !remove}
		{#if asset.mime_type.includes('html')}
			<HtmlForm bind:asset/>
		{:else}
			<AssetForm bind:asset/>
		{/if}
	{/if}
</div>

<script>
	export let bin
	export let index
	export let clip_index
	export let bin_index
	export let asset
	export let remove_ids

	let remove = false
	let editing

	$: if (remove) {
		if (!remove_ids.find(id => id === asset.id)) {
			remove_ids.push(asset.id)
			remove_ids = remove_ids
		}
	} else {
		remove_ids = remove_ids.filter(id => id !== asset.id)
	}

	import AssetThumb from './AssetThumb.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'
	import AssetForm from './AssetForm.svelte'
	import HtmlForm from '../html/HtmlForm.svelte'

	import { POST } from '../../../../utils/loaders.js'
	import { dragstart, dragover, get_changes } from '../../../../utils/story-utils.js'
	import { seq, drag_elem } from '../../../../stores/admin-store.js'

	let elem
	let dragging = false
	export let draggable = false

	async function dragend() {
		if (!draggable) { return }

		const changes = get_changes(elem)

		if (changes.length) {
			const res = await POST('/api/admin/stories/assets-reorder.post', { asset_changes: changes })

			let updated_assets
			if (res.error) {
				alert('Something went wrong. Resetting assets order. Please contact the administrator of this site for assistance.')
				updated_assets = [...$seq.clips[clip_index].asset_bins[bin_index].assets]
			} else {
				updated_assets = bin.assets.map(asset => {
					const found = changes.find(change => change.id === asset.id)
					if (found) { asset.order = found.order }
					return asset
				}).sort((one, two) => one.order - two.order)
			}

			bin.assets = updated_assets
			$seq.clips[clip_index].asset_bins[bin_index].assets = []
			setTimeout(() => $seq.clips[clip_index].asset_bins[bin_index].assets = updated_assets, 0)
		}

		$drag_elem = undefined
		dragging = false
	}
</script>

<style type="text/scss">
	.asset-row {
		position: relative;
		cursor: pointer;
		user-select: none;
		// &:hover { background-color: rgba(var(--admin-text-rgb), 0.1); }
		&.remove { color: var(--admin-alert-light); }
		&:hover,
		&.remove {
			.actions { display: block; }
		}
		&.dragging {
			box-shadow: inset 0 0 0 2rem var(--admin-accent-2);
			opacity: 0.5;
		}
	}
	.header {
		display: grid;
		grid-template-columns: 32rem 1fr 32rem;
		grid-gap: 10rem;
	}
	h3 {
		overflow: hidden;
		display: flex;
		align-items: center;
		margin: 0;
		span {
			overflow: hidden;
			display: block;
			font: 13rem/1 var(--admin-font);
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.actions {
		display: none;
		:global(> label) { transform: scale(0.9); }
	}
</style>
