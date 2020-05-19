<div class="edit-table">
	<div bind:this={table}></div>
</div>

<script>
	export let options = {}

	let hot
	let table
	let link_loaded = false
	let script_loaded = false

	import { edit_table_loaded } from '../../../../stores/admin-store.js'
	import { onMount, onDestroy } from 'svelte'

	onMount(async() => {
		if (!$edit_table_loaded) {
			const script = document.createElement('script')
			script.onload = () => script_loaded = true
			script.src = '//cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js'
			document.head.appendChild(script)

			const link = document.createElement('link')
			link.href = '//cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css'
			link.rel = 'stylesheet'
			link.onload = () => link_loaded = true
			document.head.appendChild(link)
		} else {
		 	console.log('HANDSON ALREADY LOADED')
			let link_loaded = true
			let script_loaded = true
		}
	})
	onDestroy(() => {
		if (hot) {
			debugger
			hot.destroy()
		}
	})

	$: $edit_table_loaded = link_loaded && script_loaded
	$: if ($edit_table_loaded) {
		// console.log('Handson loaded!')	
		hot = new Handsontable(table, Object.assign({
			data: [['no data']],
			rowHeaders: true,
			colHeaders: true,
			// filters: true,
			// dropdownMenu: true,
			// preventOverflow: 'vertical',
			licenseKey: 'non-commercial-and-evaluation',
			// afterChange: changes => {
			// 	if (changes) {
			// 		const row_index = changes[0][0]
			// 		const col_index = changes[0][1]
			// 		const prior_value = changes[0][2]
			// 		const value = changes[0][3]
			// 		console.log(value)
			// 		console.log(typeof value)
			// 	}
			// },
		}, options))
	}
</script>

<style type="text/scss">
	.edit-table {
		position: absolute;
		top: -1rem;
		right: -1rem;
		bottom: -1rem;
		left: -1rem;
		overflow: auto;

		:global(.htDimmed:not(.listbox)) {
			background-color: #efefef;
			color: black;
		}
	}
</style>
