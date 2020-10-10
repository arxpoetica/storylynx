<div class="hourglass">
	<div class="svg">
		<Hourglass/>
	</div>
	<p>...{loading ? 'loading' : saving_text}...</p>
</div>

<script>
	import Hourglass from '../../../svg/hourglass.svelte'
	export let loading = false
	export let saving_text = 'saving'
</script>

<style type="text/scss">
	.hourglass {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		color: var(--admin-accent-0);
		animation: rotate-color 2.5s linear infinite;
	}
	.svg {
		width: 30rem;
		height: 47rem;
		margin: 0 0 10rem;
	}
	@keyframes rotate-color {
		0% { color: var(--admin-accent-0); }
		50% { color: var(--admin-bg); }
		100% { color: var(--admin-accent-0); }
	}
</style>
