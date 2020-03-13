<div class="admin-header">
	<h1>Users</h1>
	<!-- <div class="buttons">
		<a href="/admin/articles/new" class="button success">
			Create New User
		</a>
	</div> -->
</div>
<div class="admin-full">
	<!-- <ToolBar on:trashItems={trashItems} bind:checkedItems {...$$props}/> -->
	<div class="list">
		<List bind:checkedItems {items} {cols}/>
	</div>
	<!-- <ToolBar on:trashItems={trashItems} bind:checkedItems {...$$props}/> -->
</div>

<script>
	import List from '../components/lists/List.svelte'
	// import ToolBar from '../_tools/ToolBar.svelte'

	let cols = [
		// { type: 'asset', col: 'avatar', title: 'Avatar' }, // FIXME: use?
		// { type: 'url', col: 'username', title: 'Username', url: '/admin/users/' },
		{ type: 'text', col: 'username', title: 'Username' }, // FIXME: replace with above
		{ type: 'text', col: 'role', title: 'Admin Role' },
		{ type: 'text', col: 'first', title: 'First' },
		{ type: 'text', col: 'last', title: 'Last' },
	]
	export let items
	// export let items_count

	let checkedItems

	// async function trashItems() {
	// 	if (window.confirm('Are you sure you want to move these items to the trash?')) {
	// 		// const ids = checkedItems
	// 		// 	.map((item, index) => item ? items[index].id : false)
	// 		// 	.filter(id => id)
	// 		// const answer = await POST(`/api/admin/articles/archive.json`, { ids })
	// 		// if (answer.error) {
	// 		// 	return errors = ['Something went wrong. Please try again or contact the site administrator if you continue to experience problems.']
	// 		// } else {
	// 		// 	items = items.filter(item => !ids.find(id => id === item.id))
	// 		// 	itemsCount -= answer.count
	// 		// 	checkedItems = []
	// 		// 	// if (!items.length && ) {} ... TODO: goto prior page?
	// 		// }
	// 	}
	// }
</script>

<style type="text/scss">
	.list {
		margin: 0 0 20rem;
	}
</style>
