<label class={color} class:checked on:click|stopPropagation={handler}>
	<span class="box">
		{#if checked}
			<span class="svg"><Checkmark/></span>
		{/if}
		<input bind:checked type="checkbox">
	</span>
	{#if label}
		<span class="label">
			{label}
			{#if required}<span class="required"> *</span>{/if}
		</span>
	{/if}
</label>

<script>
	export let label
	// export let sublabel
	export let required
	export let checked = false
	export let handler = () => {}
	export let color = 'blue'
	import Checkmark from '../../../svg/checkmark.svelte'
</script>

<style type="text/scss">
	label {
		display: flex;
		align-items: center;
		white-space: nowrap;
		&.checked .box { background-color: var(--admin-color-2); }
		&.good {
			&.checked .box { background-color: var(--admin-good-lighter); }
			input {
				border: 1rem solid var(--admin-good-dark);
				&:checked {
					border-color: var(--admin-good-dusk);
					background-color: var(--admin-good-dark);
				}
			}
		}
		&.warn {
			&.checked .box { background-color: var(--admin-warn-light); }
			input {
				border-color: var(--admin-warn-dusk);
				&:checked {
					border-color: var(--admin-warn-dusk);
					background-color: var(--admin-warn-dark);
				}
			}
		}
	}
	.box {
		display: block;
		position: relative;
		max-width: 32rem;
		margin: 0;
		padding: 8rem;
		border-radius: 100%;
		line-height: 0;
		cursor: default;
		transition: background-color 0.15s ease-in-out;
		&:hover { background-color: var(--admin-accent-2); }
	}
	input {
		margin: 0;
		box-sizing: border-box;
		padding: 0;
		height: 16rem;
		width: 16rem;
		background: white;
		border: 1rem solid var(--admin-color-4);
		// border-radius: 3rem;
		box-shadow: 0 0 0 transparent;
		cursor: default;
		outline: 0;
		-webkit-appearance: none;
		&:checked {
			border-color: var(--admin-color-10);
			background-color: var(--admin-color-6);
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
	.label {
		margin: 0 0 0 10rem;
	}
</style>
