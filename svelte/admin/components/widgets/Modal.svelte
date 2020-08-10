<svelte:window on:keydown={event => escape(event)}/>

{#if open}
	<div class="modal">
		<div class="back" on:click={() => open = false}></div>
		<div class="box">
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
				<slot></slot>
			</div>
		</div>
		<div class="space"></div>
	</div>
{/if}

<script>
	export let open = false
	export let title = 'Alert!'
	export let subtitle
	import Close from '../../../svg/admin-close.svelte'
	function escape(event) {
		if (open && event.key === 'Escape') {
			open = false
		}
	}
</script>

<style type="text/scss">
	.modal {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 40rem;
		background-color: rgba(var(--admin-accent-0-rgb), 0.8);
		z-index: 100;
	}
	.back {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.box {
		position: relative;
		// TODO: specify different sizes by variable?
		max-width: 750rem;
		min-width: 450rem;
		padding: 40rem;
		background-color: var(--admin-bg);
		border-radius: 20rem;
		box-shadow: var(--admin-shadow);
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin: 0 0 40rem;
	}
	h2 {
		margin: 0 0 6rem;
		font: bold 22rem/1.2 var(--admin-font);
	}
	h3 {
		margin: 0;
		font: 15rem/1.2 var(--admin-font);
		color: rgba(var(--admin-text-rgb), 0.6);
	}
	.close {
		width: 30rem;
		min-width: 30rem;
		height: 30rem;
		margin: -20rem -20rem 0 20rem;
		cursor: pointer;
	}
</style>
