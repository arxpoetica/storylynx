<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<div class="actions">
			<slot name="actions"></slot>
		</div>
	</div>
	<div class="tools">
		<slot name="tools"></slot>
	</div>
	<div class="content">
		<slot></slot>
	</div>
</div>

<script>
	export let model = ''
</script>

<style type="text/scss">
	.content-view {
		display: grid;
		grid-template-rows: auto auto 1fr;
		grid-template-columns: 1fr;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 62rem;
		padding: 12rem 20rem;
		border-bottom: 1px solid var(--admin-gray-light);
	}
	// .tools {}
	.content {
		position: relative;
		padding: 20rem;
	}
</style>
