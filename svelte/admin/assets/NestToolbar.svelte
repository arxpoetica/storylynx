{#if $items}
	<div class="toolbar">
		<h2>{title}: {$items.length}</h2>
		<slot></slot>
	</div>
{/if}

<script>
	export let items
	export let title
</script>

<style type="text/scss">
	.toolbar {
		position: sticky;
		top: -40rem;
		margin: -40rem -40rem 20rem;
		padding: 20rem 40rem;
		z-index: 20;
		background-color: rgba(var(--admin-bg-rgb), 0.9);
	}
	h2 {
		margin: 0;
		font: bold 13rem/1 var(--admin-font);
	}
</style>
