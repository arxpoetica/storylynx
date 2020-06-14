<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<div class="actions">
			<slot name="actions"></slot>
		</div>
	</div>
	<div class="content">
		<slot></slot>
	</div>
</div>
<!-- FIXME: bring this back when we've combined layouts... this is some complex problem -->
<!-- <SavePanel/> -->
<AssetPreview/>

<script>
	export let model = ''
	import SavePanel from './SavePanel.svelte'
	import AssetPreview from './AssetPreview.svelte'
</script>

<style type="text/scss">
	.content-view {
		display: grid;
		grid-template-rows: auto 1fr;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 62rem;
		padding: 12rem 20rem;
		border-bottom: 1px solid var(--admin-accent-2);
	}
	.content {
		position: relative;
		padding: 20rem;
	}
</style>
