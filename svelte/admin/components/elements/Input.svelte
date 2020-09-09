<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
	<span class="label">
		{label}
		{#if required}<span class="required"> *</span>{/if}
	</span>
	<span class="input" class:has-prelabel={prelabel}>
		{#if prelabel}
			<span class="prelabel">{prelabel}</span>
		{/if}
		{#if type === 'number'}
			<input bind:this={input} type="number" {required} {step} {min} {max} bind:value on:change={() => dispatch('change', { value })}/>
		{:else}
			<input bind:this={input} type="text" {required} {pattern} bind:value on:change={() => dispatch('change', { value })}/>
		{/if}
	</span>
	{#if sublabel}
		<span class="sublabel">{sublabel}</span>
	{/if}
</label>

<script>
	import { onMount, createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let label = 'Label'
	export let prelabel
	export let sublabel
	export let type = 'text'
	export let value = ''
	export let required
	export let autofocus
	export let pattern
	export let step = 'any'
	export let min
	export let max

	let input
	onMount(() => {
		if (autofocus) {
			input.focus()
		}
	})
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
	.input {
		display: block;
		position: relative;
		input {
			display: block;
			width: 100%;
			height: auto;
			margin: 0;
			padding: 5rem 12rem;
			background-color: var(--admin-accent-1);
			border: 1rem solid var(--admin-accent-2);
			border-radius: 5rem;
			box-shadow: none;
			font: 14rem/20rem var(--admin-font);
			color: var(--admin-text);
			transition: none;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			&:focus {
				border-color: var(--admin-form-border);
				outline: none;
				box-shadow: var(--admin-form-shadow);
			}
		}
	}
	.has-prelabel {
		display: flex;
		input {
			border-radius: 0 5rem 5rem 0;
		}
	}
	.prelabel {
		display: block;
		padding: 5rem 12rem;
		background-color: var(--admin-accent-1);
		border: 1rem solid var(--admin-accent-2);
		border-right: none;
		border-radius: 5rem 0 0 5rem;
		font: 14rem/20rem var(--admin-font);
		color: rgba(var(--admin-text-rgb), 0.4);
		white-space: nowrap;
	}
	.required { color: var(--admin-alert) }
	.sublabel {
		display: block;
		margin: 8rem 0 0;
		font: 13rem/1 var(--admin-font);
		opacity: 0.6;
	}
</style>
