<div class="row" class:picked={asset.picked} on:click={toggle_asset}>
	<AssetThumb {asset}/>
	<h3><span>{asset.filename}</span></h3>
	<div class="actions">
		<Checkbox classes="good" propagate={true} bind:checked={asset.picked}/>
	</div>
</div>

<script>
	import AssetThumb from '../assets/AssetThumb.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'

	export let assets
	export let picked
	export let asset

	function toggle_asset() {
		if (picked.has(asset.id)) {
			picked.delete(asset.id)
			// if it's not there, let's push it back on for easy access...
			if (!assets.find(find_asset => find_asset.id === asset.id)) {
				assets.unshift(asset)
			}
		} else {
			picked.set(asset.id, asset)
		}
		assets = assets.map(mapped_asset => {
			if (mapped_asset.id === asset.id) {
				mapped_asset.picked = !asset.picked
			}
			return mapped_asset
		})
		picked = picked
	}
</script>

<style type="text/scss">
	.row {
		display: grid;
		grid-template-columns: 50rem 1fr 50rem;
		grid-gap: 20rem;
		position: relative;
		margin: 0 0 6rem;
		cursor: pointer;
		user-select: none;
		&:hover { background-color: var(--admin-accent-0); }
		&.picked { background-color: rgba(var(--admin-good-rgb), 0.1); }
		&:hover,
		&.picked {
			.actions { display: flex; }
		}
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
		align-items: center;
	}
</style>
