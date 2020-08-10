{#if errors.length}
	<div class="errors">
		<h2>{title}</h2>
		<div class="errors-list">
			{#each errors as error}
				<div class="error">{error.message}</div>
			{/each}
		</div>
	</div>
{/if}

<script>
	export let title = 'Please correct the following:'
	export let errors = []
</script>

<style type="text/scss">
	.errors {
		margin: 0 0 20rem;
		padding: 20rem;
		border: 1rem solid var(--admin-alert);
		color: var(--admin-alert-text);
	}
	// .errors-list {
	// }
	// .error {
	// }
</style>
