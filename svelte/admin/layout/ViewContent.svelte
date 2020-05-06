<div class="admin-header">
	<h1>{model}</h1>
	<slot name="tools">
		<Button {href} title="Create {singular}"/>
	</slot>
</div>
<div class="admin-full">
	<!-- <ToolBar on:trash={trash} bind:checkeditems {...$$props}/> -->
	<slot></slot>
</div>

<script>
	export let model = ''
	// export let items = []
	// export let items_count = 0

	import Button from '../elements/Button.svelte'

	$: singular = model.replace(/(s|es)$/g, '')
	$: href = `/admin/${model.toLowerCase()}/new`

	async function trash() {
		if (window.confirm('Are you sure you want to move these items to the trash?')) {
			const ids = checkeditems
				.map((item, index) => item ? items[index].id : false)
				.filter(id => id)
			const answer = await POST(`/api/admin/${model.toLowerCase()}/archive.json`, { ids })
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
