<Scaffolding title={model} actions={true} toolbar={true}>

	<div class="actions" slot="actions">
		<Button label="Create {singular}" {href}/>
	</div>

	<div class="toolbar" slot="toolbar">
		<ActionsBar on:trash={trash} bind:checkeditems/>
	</div>

	<ContentList bind:checkeditems {cols} {segment}/>

	<!-- <slot></slot> -->
</Scaffolding>

<script>
	import Scaffolding from './Scaffolding.svelte'

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
	// .actions[slot="actions"] {
	// 	justify-content: flex-end;
	// }
	// .toolbar
</style>
