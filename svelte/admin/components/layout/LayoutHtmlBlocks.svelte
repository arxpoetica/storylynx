<div class="temp">
	<h1>Temp Editor</h1>
	<Editor/>
</div>

<script>
	import Editor from '../widgets/Editor.svelte'
</script>

<style type="text/scss">
	.temp {
		position: fixed;
		top: 62rem;
		right: 0;
		bottom: 0;
		left: 250rem;
		padding: 100rem;
		background-color: rgba(255, 255, 255, 0.9);
		// color: var(--admin-gray-light);
		z-index: 100000000000;
	}
</style>
