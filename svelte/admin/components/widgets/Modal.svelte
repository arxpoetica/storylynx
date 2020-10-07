<svelte:window on:keydown={event => escape(event)}/>

{#if open}
	<div class="modal {classes}">
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
		<div class="space"></div>
	</div>
{/if}

<script>
	export let open = false
	export let classes = ''
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
		&.fullscreen {
			.box {
				display: flex;
				flex-direction: column;
				width: 100%;
				max-width: none;
				height: 100%;
			}
			.body {
				overflow: hidden;
				flex: 1;
			}
		}
		:global {
			.rows {
				display: grid;
				grid-template-columns: 1fr;
				grid-gap: 20rem;
			}
			.row {
				display: grid;
				grid-template-columns: 1fr;
				grid-column-gap: 20rem;
				&.split {
					grid-template-columns: 1fr 1fr;
					.checkbox { margin-top: 22rem; }
				}
				&.fives {
					grid-template-columns: repeat(5, 1fr);
					.checkbox { margin-top: 22rem; }
				}
			}
		}
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
		position: relative;
	}
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
