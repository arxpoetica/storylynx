<div class="tile">
	<div class="out" on:click={remove}>
		<div class="in">
			<AssetThumbIcon {asset}/>
		</div>
		<div class="remove"><Remove/></div>
	</div>
	<h3>{asset.filename}</h3>
</div>

<script>
	export let asset
	export let assets
	export let picked

	import AssetThumbIcon from '../assets/AssetThumbIcon.svelte'
	import Remove from '../../../svg/admin-close.svelte'

	function remove() {
		if (picked.has(asset.id)) {
			picked.delete(asset.id)
			// if it's not there, let's push it back on for easy access...
			if (!assets.find(find_asset => find_asset.id === asset.id)) {
				assets.unshift(asset)
			}
		}
		assets = assets.map(mapped_asset => {
			if (mapped_asset.id === asset.id) {
				mapped_asset.picked = false
			}
			return mapped_asset
		})
		picked = picked
	}
</script>

<style type="text/scss">
	// .tile {}
	h3 {
		margin: 8rem 8rem 0;
		font: 11rem/1.3 var(--admin-font);
		text-transform: uppercase;
		word-break: break-word;
	}
	.out {
		position: relative;
		padding: 0 0 100%;
		cursor: pointer;
	}
	.in {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: var(--admin-accent-0);
		border-radius: 12rem;
	}
	.remove {
		position: absolute;
		top: 5rem;
		right: 5rem;
		width: 30rem;
		height: 30rem;
		padding: 5rem;
		background-color: var(--admin-accent-0);
		border-radius: 100%;
	}
</style>
