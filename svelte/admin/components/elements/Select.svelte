<label>
	<span class="label">
		{label}
		{#if sublabel}
			<span class="sublabel">{sublabel}</span>
		{/if}
	</span>
	<span class="select">
		<select bind:value>
			{#if primary}
				<option value="">{primary}</option>
			{/if}
			{#each options as option, index (option.id)}
				<option value={index}>{option.text}</option>
			{/each}
		</select>
		<span class="svg">
			<SelectCaret/>
		</span>
	</span>
</label>

<script>
	import SelectCaret from '../../../svg/select-caret.svelte'

	export let label = 'Label'
	export let sublabel
	export let value = ''
	export let primary
	export let options = []
</script>

<style type="text/scss">
	label {
		display: block;
		margin: 0 0 20rem;
		select {
			display: block;
			width: 100%;
			height: auto;
			margin: 0;
			padding: 5rem 35rem 5rem 12rem;
			background-color: var(--admin-accent-1);
			border: 1rem solid var(--admin-accent-2);
			border-radius: 5px;
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
	.label {
		display: block;
		margin: 0 0 8rem;
		font: bold 15rem/1 var(--admin-font);
	}
	.sublabel {
		font-weight: normal;
	}
	.select {
		display: block;
		position: relative;
	}
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
</style>
