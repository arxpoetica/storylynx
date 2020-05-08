<ViewContent model="Posts" {cols}/>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page: pageStore } = get_sapper_stores()

	import ViewContent from '../components/layout/ViewContent.svelte'

	let cols = [
		{ type: 'link', col: 'headline', title: 'Headline', url: '/admin/posts/', slug: 'id', sort: true },
		{ type: 'assets', col: 'assets', title: 'Cover' },
		{ type: 'array', col: 'tags', title: 'Tags', mapper: 'tag' },
		{ type: 'datetime', col: 'published', title: 'Date', sort: true },
	]

	export let items = []
	export let items_count = 0
	export let page_size = 0
	export let drafts_count = 0
	export let published_count = 0
	export let archived_count = 0

	import { content_vars } from '../../../stores/admin-store.js'
	$: content_vars.set({
		items,
		items_count,
		page_size,
		drafts_count,
		published_count,
		archived_count,
	})

	// ??????????
	// ??????????
	// ??????????
	$: page = parseInt($pageStore.query.page)
</script>

<!-- <style type="text/scss"></style> -->
