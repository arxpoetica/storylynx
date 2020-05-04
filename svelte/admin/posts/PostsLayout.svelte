<div class="admin-header">
	<h1>Post</h1>
	<Button href="/admin/posts/new" title="Create Post"/>
</div>
<div class="admin-full">
	<ToolBar on:trash={trash} bind:checkeditems {...$$props}/>
	<div class="list">
		<List bind:checkeditems {items} {cols}/>
	</div>
	<ToolBar on:trash={trash} bind:checkeditems {...$$props}/>
</div>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page: pageStore } = get_sapper_stores()

	import Button from '../elements/Button.svelte'
	import List from '../elements/List.svelte'
	import ToolBar from '../elements/ToolBar.svelte'

	let cols = [
		{ type: 'asset', col: 'assets', title: 'Cover' },
		{ type: 'url', col: 'headline', title: 'Headline', url: '/admin/posts/', slug: 'id', sort: true },
		{ type: 'array', col: 'tags', title: 'Tags', mapper: 'tag' },
		{ type: 'datetime', col: 'published', title: 'Date', sort: true },
	]

	// export let page_size = 0
	export let items = []
	export let items_count = 0
	// export let drafts_count = 0
	// export let published_count = 0
	// export let archived_count = 0
	let checkeditems = []
	$: page = parseInt($pageStore.query.page)

	async function trash() {
		if (window.confirm('Are you sure you want to move these items to the trash?')) {
			const ids = checkeditems
				.map((item, index) => item ? items[index].id : false)
				.filter(id => id)
			const answer = await POST(`/api/admin/posts/archive.json`, { ids })
			if (answer.error) {
				return errors = ['Something went wrong. Please try again or contact the site administrator if you continue to experience problems.']
			} else {
				items = items.filter(item => !ids.find(id => id === item.id))
				items_count -= answer.count
				checkeditems = []
				// if (!items.length && ) {} ... TODO: goto prior page?
			}
		}
	}
</script>

<style type="text/scss">
	.list {
		margin: 0 0 20rem;
	}
</style>
