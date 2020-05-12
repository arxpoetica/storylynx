<label class:checked class:green={color === 'green'} on:click|stopPropagation={clickhandler}>
	{#if checked}
		<div class="svg"><Checkmark/></div>
	{/if}
	<input bind:checked type="checkbox">
	<span>{checked}</span>
</label>

<script>
	export let checked = false
	export let clickhandler = () => {}
	export let color = 'blue'
	import Checkmark from '../../../svg/checkmark.svelte'
</script>

<style type="text/scss">
	label {
		display: block;
		position: relative;
		margin: 0;
		padding: 8rem;
		border-radius: 100%;
		line-height: 0;
		cursor: default;
		transition: background-color 0.15s ease-in-out;
		&:hover { background-color: var(--admin-gray-light); }
		&.checked { background-color: var(--admin-blue-lighter); }
		&.green {
			&.checked { background-color: var(--admin-green-lighter); }
			input {
				border: 1rem solid var(--admin-green-dark);
				&:checked {
					border-color: var(--admin-green-dusk);
					background-color: var(--admin-green-dark);
				}
			}
		}
	}
	input {
		margin: 0;
		box-sizing: border-box;
		padding: 0;
		height: 16rem;
		width: 16rem;
		background: white;
		border: 1rem solid var(--admin-blue-light);
		// border-radius: 3rem;
		box-shadow: 0 0 0 transparent;
		cursor: default;
		outline: 0;
		-webkit-appearance: none;
		&:checked {
			border-color: var(--admin-blue-dusk);
			background-color: var(--admin-blue);
		}
	}
	.svg {
		position: absolute;
		width: 12rem;
		height: 12rem;
		top: 10rem;
		left: 10rem;
		color: white;
		pointer-events: none;
	}
	span {
		overflow: hidden;
		position: absolute !important;
		width: 0;
		height: 0;
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(0 100% 100% 0);
	}
</style>
