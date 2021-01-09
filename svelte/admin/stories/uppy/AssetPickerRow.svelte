<div class="row" class:picked={asset.picked} on:click={toggle_asset}>
	<div><AssetThumb {asset}/></div>
	<div class="filename"><span>{asset.filename}</span></div>
	<div class="timestamp">{dayjs(asset.created).format('MMM D, YYYY h:mma')}</div>
	{#if can_pick}
		<div><Checkbox classes="good" propagate={true} bind:checked={asset.picked}/></div>
	{/if}
</div>

<script>
	import dayjs from 'dayjs'
	import AssetThumb from '../assets/AssetThumb.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'

	export let assets
	export let picked
	export let asset
	export let can_pick

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
		position: relative;
		display: table-row;
		background-color: var(--admin-accent-1);
		border: 1rem solid var(--admin-accent-0);
		color: inherit;
		text-decoration: none;
		cursor: pointer;
		user-select: none;
		&:hover { background-color: var(--admin-color-1); }
		&.picked { background-color: rgba(var(--admin-good-rgb), 0.4); }
		> div {
			display: table-cell;
			padding: 0 12rem;
			vertical-align: middle;
			&:first-child { padding: 0 12rem 0 0; }
			&:last-child { padding: 0 18rem 0 12rem; }
		}
	}
	.filename {
		position: relative;
		&::before {
			content: '&nbsp;';
			visibility: hidden;
		}
		> span {
			overflow: hidden;
			position: absolute;
			left: 12rem;
			right: 12rem;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.timestamp { white-space: nowrap; }
</style>
