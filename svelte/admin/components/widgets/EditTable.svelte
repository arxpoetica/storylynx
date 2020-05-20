<div class="edit-table">
	<div bind:this={table}></div>
</div>

<script>
	export let options = {}

	let table

	import { saveable, hot, hot_loaded } from '../../../../stores/admin-store.js'
	import { onMount, onDestroy } from 'svelte'

	onMount(async() => {
		if (!$hot_loaded) {
			await new Promise(resolve => {
				const script = document.createElement('script')
				script.onload = () => resolve()
				script.src = '//cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js'
				document.head.appendChild(script)
			})
			await new Promise(resolve => {
				const link = document.createElement('link')
				link.href = '//cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css'
				link.rel = 'stylesheet'
				link.onload = () => resolve()
				document.head.appendChild(link)
			})
			$hot_loaded = true
		}
	})
	onDestroy(() => {
		if ($hot) {
			$hot.destroy()
			$hot = null
		}
	})

	$: if ($hot_loaded && table) {
		$hot = new Handsontable(table, Object.assign({
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
