<div class="buttons {classes}">
	<slot></slot>
</div>

<script>
	export let classes = ''
</script>

<style type="text/scss">
	.buttons {
		display: flex;
		align-items: center;
		margin: 0 -6rem 20rem -6rem;
		min-height: 36rem;
		&.no-margin { margin: 0 -6rem; }
		&.align-right { justify-content: flex-end; }
		:global(.button) { margin: 0 6rem; }
	}
</style>
