<div class="outer">
	{#if title}
		<h2 class="h6">{title}</h2>
	{/if}
	<div class="inner">
		<select bind:value={$store}>
			{#if primary}
				<option value="">{primary}</option>
			{/if}
			{#each options as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
		<div class="svg">
			<SelectCaret/>
		</div>
	</div>
</div>

<script>
	import SelectCaret from '../svg/select-caret.svelte'

	export let title
	export let store
	export let primary
	export let options = []
</script>

<style type="text/scss">
	// .outer {}
	h2 {
		margin: 0 0 6rem;
	}
	.inner {
		position: relative;
	}
	.svg {
		position: absolute;
		right: 12rem;
		top: 50%;
		width: 12rem;
		height: 6rem;
		margin: -3rem 0 0;
		line-height: 0;
		pointer-events: none;
	}
	select {
		display: block;
		padding: 0 32rem 0 10rem;
		height: 34rem;
		width: 100%;
		margin: 0;
		// background-color: $white;
		background-color: transparent;
		border: 1px solid #afafb1;
		border-radius: 0;
		line-height: 34rem;
		transition: all 0.25s ease-in-out;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		&::-ms-expand {
			display: none;
		}
		&:hover,
		&:focus {
			background-color: white;
			border-color: black;
		}
	}
</style>
