<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="checkbox {classes}" class:checked on:click={event => internal_handler(event)}>
	<span class="group">
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
	</span>
	{#if sublabel}
		<span class="sublabel">{sublabel}</span>
	{/if}
</label>

<script>
	export let label
	export let sublabel
	export let required
	export let checked = false
	export let handler = () => {}
	export let classes = ''
	export let propagate = false
	import Checkmark from '../../../svg/checkmark.svelte'

	function internal_handler(event) {
		if (!propagate) {
			event.stopPropagation()
		}
		handler(event)
	}
</script>

<style type="text/scss">
	label {
		display: block;
		&.checked .box { background-color: var(--admin-accent-2); }
		&.blue {
			&.checked .box { background-color: var(--admin-color-2); }
			input {
				&:checked {
					border-color: var(--admin-color-10);
					background-color: var(--admin-color-6);
				}
			}
		}
		&.good {
			&.checked .box { background-color: var(--admin-good-lighter); }
			input {
				&:checked {
					border-color: var(--admin-good-dusk);
					background-color: var(--admin-good-dark);
				}
			}
		}
		&.warn {
			&.checked .box { background-color: var(--admin-warn-light); }
			&.checked .svg { color: var(--admin-warn-dusk); }
			input {
				&:checked {
					border-color: var(--admin-warn-dusk);
					background-color: var(--admin-warn-dark);
				}
			}
		}
		&.alert {
			&.checked .box { background-color: var(--admin-alert-light); }
			&.checked .svg { color: var(--admin-alert-dusk); }
			input {
				&:checked {
					border-color: var(--admin-alert-dusk);
					background-color: var(--admin-alert-dark);
				}
			}
		}
	}
	.group {
		display: flex;
		align-items: center;
		white-space: nowrap;
	}
	.box {
		display: block;
		position: relative;
		max-width: 32rem;
		margin: 0;
		padding: 8rem;
		background-color: var(--admin-accent-1);
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
		background: var(--admin-accent-1);
		border: 1rem solid var(--admin-accent-4);
		border-radius: 1rem;
		box-shadow: 0 0 0 transparent;
		cursor: default;
		outline: 0;
		-webkit-appearance: none;
		&:checked {
			border-color: var(--admin-color-9);
			background-color: var(--admin-accent-6);
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
	.sublabel {
		display: block;
		margin: 0 0 0 42rem;
		font: 13rem/1 var(--admin-font);
		opacity: 0.6;
	}
</style>
