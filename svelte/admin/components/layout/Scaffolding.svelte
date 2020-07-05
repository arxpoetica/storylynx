<div class="header">
	<div class="row">
		<h1>{title}</h1>
		<div class="actions">
			<slot name="actions"></slot>
		</div>
	</div>
	<slot name="tools"></slot>
</div>
<div class="content">
	<slot></slot>
</div>

<script>
	export let title = 'StoryLynx'
</script>

<style type="text/scss">
	// .header {}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12rem 20rem;
		border-bottom: 1px solid var(--admin-accent-2);
	}
	.content {
		position: relative;
		padding: 40rem;
	}
</style>
