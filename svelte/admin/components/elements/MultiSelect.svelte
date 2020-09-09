<div class="multi-select">
	<div class="label">
		{label}
		{#if required}<div class="required"> *</div>{/if}
	</div>
	<div class="selectors">
		{#each options as option (option.id)}
			<button class="select" class:on={values.includes(option.id)} on:click={() => toggle(option.id)}>
				{option.text}
			</button>
		{/each}
	</div>
</div>

<script>
	export let label = 'Label'
	// export let sublabel
	export let values = []
	export let required
	export let options = []

	function toggle(id) {
		if (values.includes(id)) {
			values = values.filter(value => value !== id)
		} else {
			values.push(id)
			values = values
		}
	}
</script>

<style type="text/scss">
	.multi-select {
		margin: 0 0 20rem;
	}
	.label {
		margin: 0 0 8rem;
		font: bold 15rem/1 var(--admin-font);
	}
	.selectors {
		display: flex;
		flex-wrap: wrap;
		margin: -6rem -3rem 0;
	}
	.select {
		margin: 6rem 3rem 0;
		padding: 3rem 6rem;
		background: var(--admin-accent-1);
		border: 1rem solid var(--admin-accent-2);
		border-radius: 5rem;
		color: var(--admin-accent-4);
		font: 14rem/20rem var(--admin-font);
		transition: all 0.1s ease-in-out;
		cursor: pointer;
		-webkit-appearance: none;
		user-select: none;
		&:hover {
			background-color: var(--admin-accent-0);
			outline-offset: 3rem;
		}
		&:focus {
			border-color: var(--admin-form-border);
			outline: none;
			box-shadow: var(--admin-form-shadow);
		}
		&.on {
			background-color: var(--admin-accent-9);
			color: var(--admin-bg);
		}
	}
</style>
