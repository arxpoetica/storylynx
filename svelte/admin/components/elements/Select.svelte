<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
	<span class="label">
		{label}
		{#if required}<span class="required"> *</span>{/if}
	</span>
	<span class="select">
		<select bind:value on:change={() => dispatch('change', { value })}>
			{#if primary}
				<option value="">{primary}</option>
			{/if}
			{#each options as option (option.id)}
				<option value={option.id}>{option.text}</option>
			{/each}
		</select>
		<span class="svg">
			<SelectCaret/>
		</span>
	</span>
	{#if sublabel}
		<span class="sublabel">{sublabel}</span>
	{/if}
</label>

<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	import SelectCaret from '../../../svg/select-caret.svelte'

	export let label = 'Label'
	export let sublabel
	export let value = ''
	export let required
	export let primary = '-- select --'
	export let options = []
</script>

<style type="text/scss">
	label {
		display: block;
		margin: 0 0 20rem;
	}
	.label {
		display: block;
		margin: 0 0 8rem;
		font: bold 15rem/1 var(--admin-font);
	}
	.select {
		display: block;
		position: relative;
		select {
			display: block;
			width: 100%;
			height: auto;
			margin: 0;
			padding: 5rem 35rem 5rem 12rem;
			background-color: var(--admin-accent-1);
			border: 1rem solid var(--admin-accent-2);
			border-radius: 5rem;
			box-shadow: none;
			font: 14rem/20rem var(--admin-font);
			color: var(--admin-text);
			// transition: background-color 0.2s ease-in-out;
			transition: none;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			cursor: pointer;
			// &:hover {
			// 	background-color: var(--admin-accent-3);
			// }
			&:focus {
				border-color: var(--admin-form-border);
				outline: none;
				box-shadow: var(--admin-form-shadow);
			}
			// &::-ms-expand {
			// 	display: none;
			// }
		}
	}
	.required { color: var(--admin-alert) }
	.svg {
		display: block;
		position: absolute;
		right: 12rem;
		top: 50%;
		width: 12rem;
		height: 6rem;
		margin: -3rem 0 0;
		color: var(--admin-accent-4);
		line-height: 0;
		pointer-events: none;
	}
	.sublabel {
		display: block;
		margin: 8rem 0 0;
		font: 13rem/1 var(--admin-font);
		opacity: 0.6;
	}
</style>
