<div class="toolbar">
	<div class="info">{checkeditems.filter(val => val).length} items selected</div>
	<!-- <div class="tools">
		{#if $vars.drafts_count || $vars.archived_count}
			<button class="button {off === 'all' ? 'off' : 'link'}">All</button> ({$vars.items_count})
		{/if}
		{#if $vars.published_count}
			| <button class="button {off === 'published' ? 'off' : 'link'}">Published</button> ({$vars.published_count})
		{/if}
		{#if $vars.drafts_count}
			| <button class="button {off === 'drafts' ? 'off' : 'link'}">Drafts</button> ({$vars.drafts_count})
		{/if}
		{#if $vars.archived_count}
			| <button class="button {off === 'trash' ? 'off' : 'link'}">Trash</button> ({$vars.archived_count})
		{/if}

		{#if checkeditems.filter(checked => checked).length}
			<Button title="Move Selected Items to Trash" classes="alert" handler={send_dispatch}/>
		{/if}
	</div> -->
	<!-- {#if items_count > page_size}
		<div class="pagination">
			<Pagination href="/admin/posts" {page} {page_size} {items} {items_count}/>
		</div>
	{/if} -->
</div>

<script>
	import { content_vars as vars } from '../../../../stores/admin-store.js'
	import { createEventDispatcher } from 'svelte'

	// // FIXME: we need to do infinite scroll, NOT PAGINATION!!!! ????
	// // FIXME: AND GOOD FILTERS / SEARCH!!!
	// import Pagination from '../elements/Pagination.svelte'
	// import Button from '../elements/Button.svelte'

	export let checkeditems
	// let off = 'all'

	const dispatch = createEventDispatcher()
	function send_dispatch() {
		dispatch('trash')
	}
</script>

<style type="text/scss">
	.toolbar {
		// display: flex;
		// justify-content: space-between;
		// align-items: flex-end;
		// margin: 0 0 10rem;
		padding: 12rem 16rem;
		border-bottom: 1rem solid var(--admin-gray-light);
		background-color: var(--admin-gray-lighter);
		font: $light 13rem/1 $font;
	}
	// .pagination {
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: flex-end;
	// }
</style>
