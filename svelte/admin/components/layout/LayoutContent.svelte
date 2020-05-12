<div class="content-view-list">
	<div class="header">
		<h1>{model}</h1>
		<Button {href} title="Create {singular}"/>
	</div>
	<div class="tools">
		<ActionsBar on:trash={trash} bind:checkeditems/>
	</div>
	<div class="content">
		<ContentList bind:checkeditems {cols} {segment}/>
	</div>
</div>
<slot></slot>
<!-- <main class="content-view"></main> -->

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page: pageStore } = get_sapper_stores()

	export let model = ''
	export let cols = []
	export let items = []
	export let items_count = 0
	export let page_size = 0
	export let drafts_count = 0
	export let published_count = 0
	export let archived_count = 0

	import { content_vars as vars } from '../../../../stores/admin-store.js'

	$: vars.set({
		items,
		items_count,
		page_size,
		drafts_count,
		published_count,
		archived_count,
	})

	import Button from '../elements/Button.svelte'
	import ActionsBar from '../widgets/ActionsBar.svelte'
	import ContentList from '../widgets/ContentList.svelte'

	$: singular = model.replace(/(s|es)$/g, '')
	$: segment = model.toLowerCase()
	$: href = `/admin/${segment}/new`

	let checkeditems = []
	async function trash() {
		if (window.confirm('Are you sure you want to move these items to the trash?')) {
			const ids = checkeditems
				.map((item, index) => item ? $vars.items[index].id : false)
				.filter(id => id)
			const answer = await POST(`/api/admin/${model.toLowerCase()}/archive.json`, { ids })
			if (answer.error) {
				return errors = ['Something went wrong. Please try again or contact the site administrator if you continue to experience problems.']
			} else {
				$vars.set($vars.items.filter(item => !ids.find(id => id === item.id)))
				$vars.set($vars.items_count - answer.count)
				checkeditems = []
				// if (!$vars.items.length && ) {} ... TODO: goto prior page?
			}
		}
	}
</script>

<style type="text/scss">
	.content-view-list {
		display: grid;
		// grid-template-areas:
		// 	"header header"
		// 	"main side"
		// ;
		grid-template-rows: auto auto 1fr;
		grid-template-columns: 1fr;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// grid-row: header;
		// grid-column: header;
		padding: 12rem;
		border-bottom: 1px solid var(--admin-gray-light);
	}
	// .tools {
	// }
	// .content {
	// 	grid-row: main;
	// 	grid-column: main / side;
	// 	padding: 20rem;
	// }
	// .content-view {
	// 	position: fixed;
	// 	top: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	width: calc(100vw - 500rem);
	// 	background-color: white;
	// 	box-shadow: -5rem 0 15rem rgba(0, 0, 0, 0.05);
	// 	border-left: 1rem solid var(--admin-gray-light);
	// 	z-index: 999;
	// }
</style>
