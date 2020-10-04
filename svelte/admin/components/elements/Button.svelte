{#if href}
	<a
		bind:this={element}
		{href}
		class="button {classes}"
		{style}
		class:disabled
		on:click={event => internal_handler(event)}
	>
		<slot>{label}</slot>
		{#if classes.includes('plus')}<span class="svg"><Plus/></span>{/if}
	</a>
{:else}
	<button
		bind:this={element}
		class="button {classes}"
		{style}
		{disabled}
		on:click={event => internal_handler(event)}
	>
		<slot>{label}</slot>
		{#if classes.includes('plus')}<span class="svg"><Plus/></span>{/if}
	</button>
{/if}

<script>
	export let href = false
	export let classes = ''
	export let style
	export let label = 'Click'
	export let disabled
	export let element
	export let stop_propagation
	export let handler = () => {}
	function internal_handler(event) {
		if (stop_propagation) {
			event.stopPropagation()
		}
		handler(event)
	}
	import Plus from '../../../svg/icon-plus.svelte'
</script>

<style type="text/scss">
	.button {
		height: 36rem;
		margin: 0;
		padding: 0 15rem;
		background-color: var(--admin-color-6);
		border: 0;
		border-radius: 4rem;
		color: var(--admin-bg);
		font: bold 14rem/36rem var(--admin-font);
		text-transform: none;
		text-align: center;
		letter-spacing: 1rem;
		white-space: nowrap;
		transition: all 0.15s ease-in-out;
		text-decoration: none;
		cursor: pointer;
		-webkit-appearance: none;
		user-select: none;
		&:hover {
			background-color: var(--admin-color-4);
			text-decoration: none;
			outline-offset: 3rem;
		}
		&:focus {
			border-color: var(--admin-form-border);
			outline: none;
			box-shadow: var(--admin-form-shadow);
		}
		&.block {
			display: block;
			width: 100%;
			margin: 0 0 8rem;
		}
		&.tiny {
			height: 24rem;
			line-height: 24rem;
			padding: 0 8rem;
			font-size: 10rem;
			text-transform: uppercase;
		}
		&.small {
			height: 30rem;
			line-height: 30rem;
			padding: 0 10rem;
			font-size: 12rem;
		}
		// &.large {
		// 	padding: 10rem 30rem;
		// 	font-size: 22rem;
		// }
		// &.huge {
		// 	padding: 20rem 50rem;
		// 	font-size: 34rem;
		// }
		&.good {
			background-color: var(--admin-good-dark);
			color: #2e3539;
			&:hover { background-color: var(--admin-good); }
		}
		&.warn {
			background-color: var(--admin-warn);
			color: #2e3539;
			&:hover { background-color: var(--admin-warn-dark); }
		}
		&.alert {
			background-color: var(--admin-alert);
			color: var(--admin-text);
			&:hover { background-color: var(--admin-alert-dark); }
		}
		&.dark {
			background-color: var(--admin-bg);
			color: var(--admin-accent-4);
			&:hover { background-color: var(--admin-accent-0); }
		}
		&.plain {
			background-color: var(--admin-text);
			color: var(--admin-accent-1);
			&:hover { background-color: rgba(var(--admin-text-rgb), 0.75); }
		}
		&.inverse {
			background-color: white;
			color: var(--admin-color-6);
			border: 1rem solid var(--admin-color-6);
			&:hover {
				color: var(--admin-color-4);
				border-color: var(--admin-color-4);
			}
		}
		&.blank {
			padding: 0 5rem;
			height: auto;
			background-color: transparent;
			color: var(--admin-color-6);
			line-height: 1;
			&:hover {
				background-color: transparent;
				text-decoration: underline;
			}
			&.good { color: var(--admin-good-dark); }
			&.warn { color: var(--admin-warn); }
			&.alert { color: var(--admin-alert); }
			&.plain { color: var(--admin-text); }
		}
		// &.off {
		// 	padding: 0;
		// 	background-color: transparent;
		// 	color: $button-black;
		// 	cursor: default;
		// 	pointer-events: none;
		// 	&:hover {
		// 		background-color: transparent;
		// 		color: $button-black;
		// 	}
		// }
		&[disabled] {
			background-color: var(--admin-accent-2);
			color: var(--admin-bg);
			cursor: default;
			pointer-events: none;
		}
		&[class*="blank"][disabled] {
			background-color: transparent;
			color: var(--admin-accent-2);
		}
	}
	.svg {
		width: 10rem;
		height: 10rem;
		margin: 0 0 0 6rem;
		line-height: 0;
	}
</style>
