<main class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<Button {href} title="Create {singular}"/>
	</div>
	<div class="tools">
		<ActionsBar on:trash={trash} bind:checkeditems/>
	</div>
	<div class="content">
		<ContentList bind:checkeditems {cols}/>
	</div>
</main>

<script>
	export let model = ''
	export let cols = []

	import { content_vars as vars } from '../../../../stores/admin-store.js'

	import Button from '../elements/Button.svelte'
	import ActionsBar from '../widgets/ActionsBar.svelte'
	import ContentList from '../widgets/ContentList.svelte'


	$: singular = model.replace(/(s|es)$/g, '')
	$: href = `/admin/${model.toLowerCase()}/new`

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
	main {
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
</style>
