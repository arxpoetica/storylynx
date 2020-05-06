{#if href}
	<a {href} class="button {classes}" on:click={clickhandler}>
		{title}
	</a>
{:else}
	<button class="button {classes}" on:click={clickhandler}>
		{title}
	</button>
{/if}


<script>
	export let href = false
	export let classes = ''
	export let clickhandler = () => {}
	export let title = 'Click'
</script>

<style type="text/scss">
	.button {
		height: 36rem;
		margin: 0;
		padding: 0 15rem;
		background-color: var(--admin-blue);
		border: none;
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
		&:hover,
		&:focus {
			background-color: var(--admin-blue-light);
			text-decoration: none;
		}
		// &.tiny {
		// 	padding: 4rem 8rem;
		// 	font-size: 9rem;
		// 	text-transform: uppercase;
		// }
		// &.small {
		// 	padding: 6rem 10rem;
		// 	font-size: 11rem;
		// 	text-transform: uppercase;
		// }
		// &.large {
		// 	padding: 10rem 30rem;
		// 	font-size: 22rem;
		// }
		// &.huge {
		// 	padding: 20rem 50rem;
		// 	font-size: 34rem;
		// }
		// &.success {
		// 	background-color: $success-1;
		// 	color: $white;
		// 	&:hover,
		// 	&:focus {
		// 		background-color: $success-2;
		// 		color: $white;
		// 	}
		// }
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
			border: 1rem solid var(--admin-red-dark);
			color: var(--admin-red-text);
			&:hover,
			&:focus {
				background-color: var(--admin-red-light);
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
		// &[disabled] {
		// 	background-color: $gray-main;
		// 	color: $white;
		// 	cursor: default;
		// 	pointer-events: none;
		// 	&:hover,
		// 	&:focus {
		// 		background-color: $gray-main;
		// 		color: $white;
		// 	}
		// }
	}
</style>
