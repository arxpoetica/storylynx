<main class="content-item">
	<slot></slot>
</main>

<style type="text/scss">
	.content-item {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: calc(100vw - 500rem);
		background-color: white;
		box-shadow: -5rem 0 15rem rgba(0, 0, 0, 0.05);
		border-left: 1rem solid var(--admin-gray-light);
		z-index: 999;
	}
</style>
