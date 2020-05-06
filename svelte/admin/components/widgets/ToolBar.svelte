<div class="toolbar">
	<div class="tools">

		<StatusSelect {...$$props}/>

		{#if checkeditems.filter(checked => checked).length}
			<Button title="Move Selected Items to Trash" classes="alert" clickhandler={send_dispatch}/>
		{/if}
	</div>
	{#if items_count > page_size}
		<div class="pagination">
			<Pagination href="/admin/posts" {page} {page_size} {items} {items_count}/>
		</div>
	{/if}
</div>

<script>
	import { createEventDispatcher } from 'svelte'

	// FIXME: we need to do infinite scroll, NOT PAGINATION!!!! ????
	// FIXME: AND GOOD FILTERS / SEARCH!!!
	import Pagination from '../elements/Pagination.svelte'
	import StatusSelect from '../elements/StatusSelect.svelte'
	import Button from '../elements/Button.svelte'
	const { page, page_size, items, items_count, drafts_count, published_count, archived_count } = $$props
	export let checkeditems

	const dispatch = createEventDispatcher()
	function send_dispatch() {
		dispatch('trash')
	}
</script>

<style type="text/scss">
	.toolbar {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin: 0 0 10rem;
	}
	.pagination {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
</style>
