<ViewContent model="Users" {cols}/>

<script>
	import ViewContent from '../components/layout/ViewContent.svelte'

	let cols = [
		// { type: 'asset', col: 'avatar', title: 'Avatar' }, // FIXME: use?
		// { type: 'url', col: 'username', title: 'Username', url: '/admin/users/' },
		{ type: 'text', col: 'username', title: 'Username' }, // FIXME: replace with above
		{ type: 'text', col: 'role', title: 'Role' },
		{ type: 'text', col: 'first', title: 'First' },
		{ type: 'text', col: 'last', title: 'Last' },
	]

	export let items = []
	export let items_count = 0
	// export let page_size = 0
	// export let drafts_count = 0
	// export let published_count = 0
	// export let archived_count = 0

	import { content_vars } from '../../../stores/admin-store.js'
	$: content_vars.set({
		items,
		items_count,
		// page_size,
		// drafts_count,
		// published_count,
		// archived_count,
	})
</script>

<!-- <style type="text/scss"></style> -->
