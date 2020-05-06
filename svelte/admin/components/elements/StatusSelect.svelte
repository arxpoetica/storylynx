{#if drafts_count || archived_count}
	<button class="button {off === 'all' ? 'off' : 'link'}">All</button> ({items_count})
{/if}
{#if published_count}
	| <button class="button {off === 'published' ? 'off' : 'link'}">Published</button> ({published_count})
{/if}
{#if drafts_count}
	| <button class="button {off === 'drafts' ? 'off' : 'link'}">Drafts</button> ({drafts_count})
{/if}
{#if archived_count}
	| <button class="button {off === 'trash' ? 'off' : 'link'}">Trash</button> ({archived_count})
{/if}

<script>
	const { items_count, drafts_count, published_count, archived_count } = $$props
	let off = 'all'
</script>

<style type="text/scss">
	.button {
		margin: 0;
	}
</style>
