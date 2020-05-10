<header class="header">
	<a class="logo" href="/">
		<span>{process.env.LYNX_SITE_NAME}</span>
	</a>
	<Toolbar/>
</header>

<script>
	import Toolbar from './Toolbar.svelte'
</script>

<style type="text/scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		padding: 25rem;
		z-index: 999999999;
		pointer-events: none;
	}
	.logo {
		font-weight: bold;
		text-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.75);
		color: white;
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
		pointer-events: all;
		&:hover {
			opacity: 1;
		}
	}
</style>
