<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<!-- <Button {href} title="Create {singular}"/> -->
	</div>
	<div class="tools">
		<!-- <ActionsBar on:trash={trash} bind:checkeditems/> -->
	</div>
	<div class="content">
		<!-- <p>{console.log(items)}</p> -->
		<!-- <ContentList bind:checkeditems {cols} {segment}/> -->
	</div>
</div>
<slot></slot>

<script>
	export let model = ''
	// export let cols = []
	// export let items = []

	// import Button from '../elements/Button.svelte'
	// import ActionsBar from '../widgets/ActionsBar.svelte'
	// import ContentList from '../widgets/ContentList.svelte'
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
