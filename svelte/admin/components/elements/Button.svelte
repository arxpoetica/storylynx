{#if href}
	<a bind:this={element} {href} class="button {classes}" class:disabled on:click|stopPropagation={event => handler(event)}>
		{title}
	</a>
{:else}
	<button bind:this={element} class="button {classes}" {disabled} on:click|stopPropagation={event => handler(event)}>
		{title}
	</button>
{/if}

<script>
	export let href = false
	export let classes = ''
	export let title = 'Click'
	export let disabled = false
	export let element
	export let handler = () => {}
</script>

<style type="text/scss">
	.button {
		height: 36rem;
		margin: 0;
		padding: 0 15rem;
		background-color: var(--admin-blue);
		border: 0;
		border-radius: 4rem;
		color: white;
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
		&:hover,
		&:focus {
			background-color: var(--admin-blue-light);
			text-decoration: none;
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
			background-color: var(--admin-green-dark);
			color: white;
			&:hover,
			&:focus {
				background-color: var(--admin-green-darker);
			}
		}
		// &.warning {
		// 	background-color: $warning-1;
		// 	color: $button-black;
		// 	&:hover,
		// 	&:focus {
		// 		background-color: $warning-2;
		// 		color: $button-black;
		// 	}
		// }
		&.alert {
			background-color: var(--admin-red);
			color: white;
			&:hover,
			&:focus {
				background-color: var(--admin-red-dark);
			}
		}
		&.inverse {
			background-color: white;
			color: var(--admin-blue);
			border: 1rem solid var(--admin-blue);
			&:hover,
			&:focus {
				color: var(--admin-blue-light);
				border-color: var(--admin-blue-light);
			}
		}
		// &.link {
		// 	padding: 0;
		// 	border: 0;
		// 	color: $links;
		// 	background-color: transparent;
		// 	&:hover {
		// 		text-decoration: underline;
		// 	}
		// }
		// &.blank {
		// 	background-color: transparent;
		// 	color: $links;
		// 	&:hover,
		// 	&:focus {
		// 		text-decoration: underline;
		// 	}
		// }
		// &.off {
		// 	padding: 0;
		// 	background-color: transparent;
		// 	color: $button-black;
		// 	cursor: default;
		// 	pointer-events: none;
		// 	&:hover,
		// 	&:focus {
		// 		background-color: transparent;
		// 		color: $button-black;
		// 	}
		// }
		&[disabled],
		&.disabled {
			background-color: var(--admin-gray-light);
			color: var(--admin-white);
			cursor: default;
			pointer-events: none;
		}
	}
</style>
