<svelte:window on:keydown={event => escape(event)}/>

{#if open}
	<div class="panel">
		<div class="header">
			<div class="titles">
				<h2>{title}</h2>
				{#if subtitle}
					<h3>{subtitle}</h3>
				{/if}
			</div>
			<div class="close" on:click={() => open = false}><Close/></div>
		</div>
		<div class="body">
			{#if loading || saving}
				<div class="hourglass">
					<div class="svg">
						<Hourglass/>
					</div>
					<p>...{loading ? 'loading' : saving_text}...</p>
				</div>
			{:else}
				<slot></slot>
			{/if}
		</div>
	</div>
{/if}

<script>
	export let open = false
	export let loading = false
	export let saving = false
	export let saving_text = 'saving'
	export let title = 'Alert!'
	export let subtitle
	import Close from '../../../svg/admin-close.svelte'
	import Hourglass from '../../../svg/hourglass.svelte'
	function escape(event) {
		if (open && event.key === 'Escape') {
			open = false
		}
	}
</script>

<style type="text/scss">
	.panel {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: var(--admin-panel-width);
		background-color: var(--admin-bg);
		z-index: 99;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 40rem;
	}
	h2 {
		margin: 0 0 6rem;
		font: bold 22rem/1.2 var(--admin-font);
	}
	h3 {
		margin: 0;
		font: 15rem/1.2 var(--admin-font);
		opacity: 0.6;
	}
	.close {
		width: 30rem;
		min-width: 30rem;
		height: 30rem;
		margin: -20rem -20rem 0 20rem;
		cursor: pointer;
	}
	.body {
		overflow: auto;
		position: relative;
		padding: 0 40rem 40rem;
		@mixin scrollbar {}
	}
	.hourglass {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 150rem;
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
