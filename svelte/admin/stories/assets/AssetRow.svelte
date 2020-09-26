<!-- <div class="asset">
	{#if asset.mime_type.includes('image')}
		<img src="https://media.graphcms.com/output=format:jpg/resize=width:520/{asset.handle}" alt={asset.filename}/>
	{:else if asset.mime_type.includes('video')}
		<video controls><source src={asset.url} type={asset.mime_type}/></video>
	{:else}
		<div class="unknown-mimetype">{asset.mime_type}</div>
	{/if}
</div> -->

<div class="asset-row" class:remove>
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
	export let asset
	// export let index
	export let remove = false

	let editing

	import AssetThumb from './AssetThumb.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'
	import AssetForm from './AssetForm.svelte'
	import HtmlForm from '../html/HtmlForm.svelte'
</script>

<style type="text/scss">
	.asset-row {
		position: relative;
		cursor: pointer;
		// &:hover { background-color: rgba(var(--admin-text-rgb), 0.1); }
		&.remove { color: var(--admin-alert-light); }
		&:hover,
		&.remove {
			.actions { display: block; }
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
		// :global(> label) { transform: scale(0.8); }
	}
</style>
