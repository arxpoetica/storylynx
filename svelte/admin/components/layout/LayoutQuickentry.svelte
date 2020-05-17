<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
	</div>
	<div class="content">
	</div>
</div>
<slot></slot>

<script>
	export let model = ''
</script>

<style type="text/scss">
	.content-view {
		display: grid;
		// grid-template-areas:
		// 	"header header"
		// 	"main side"
		// ;
		grid-template-rows: auto auto 1fr;
		grid-template-columns: 1fr;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// grid-row: header;
		// grid-column: header;
		padding: 12rem;
		border-bottom: 1px solid var(--admin-gray-light);
	}
	// .tools {
	// }
	// .content {
	// 	grid-row: main;
	// 	grid-column: main / side;
	// 	padding: 20rem;
	// }
</style>
