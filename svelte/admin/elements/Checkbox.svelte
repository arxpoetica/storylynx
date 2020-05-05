<label class:checked on:click={clickhandler}>
	{#if checked}
		<div class="svg"><Checkmark/></div>
	{/if}
	<input bind:checked type="checkbox">
	<span>{checked}</span>
</label>

<script>
	export let checked = false
	export let clickhandler = () => {}
	import Checkmark from '../../svg/checkmark.svelte'
</script>

<style type="text/scss">
	label {
		display: block;
		position: relative;
		margin: 0;
	}
	input {
		margin: 0;
		box-sizing: border-box;
		padding: 0;
		height: 18rem;
		width: 18rem;
		background: white;
		border: 1rem solid var(--admin-green-dark);
		// border-radius: 3rem;
		box-shadow: 0 0 0 transparent;
		transition: 0.15s border-color ease-in-out;
		cursor: pointer;
		outline: 0;
		-webkit-appearance: none;
		&:checked {
			background-color: var(--admin-green-dark);
		}
	}
	.svg {
		position: absolute;
		width: 15rem;
		height: 15rem;
		top: 2rem;
		left: 2rem;
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
