<div class="edit-table">
	<div bind:this={table}></div>
</div>

<script>
	export let options = {}

	import { saveable, hot, hot_loaded, hot_changes } from '../../../../stores/admin-store.js'
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

	let table
	let table_init
	$: if ($hot_loaded && table && !table_init) {
		table_init = true
		$hot = new Handsontable(table, Object.assign({
			data: [['no data']],
			rowHeaders: true,
			colHeaders: true,
			// filters: true,
			// dropdownMenu: true,
			// preventOverflow: 'vertical',
			licenseKey: 'non-commercial-and-evaluation',
			afterChange: changes => {
				if (changes) {
					for (let change of changes) {
						const row_index = change[0]
						const col_index = change[1]
						let prior_value = change[2]
						let value = change[3]
						prior_value = prior_value === null ? '' : prior_value
						value = value === null ? '' : value
						if (prior_value !== value) {
							const key = options.colHeaders[col_index].toLowerCase().replace(/\s+/g, '_')
							const id = $hot.getDataAtCell(row_index, 0)
							const index = $hot_changes.findIndex(row => row.id === id)
							if (index > -1) {
								$hot_changes[index] = Object.assign($hot_changes[index], { [key]: value })
							} else {
								$hot_changes.push({ id, [key]: value })
								$hot_changes = $hot_changes
							}
							$saveable = true
						}
					}
				}
			},
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
		:global(.handsontable td) { color: black; }
		:global(.handsontable.listbox td.htDimmed) { color: black; }


		// NOT SURE ABOUT THIS...

		// :global {

		// 	.handsontable tr {
		// 		background: var(--admin-bg)
		// 	}

		// 	.handsontable .table caption + thead tr:first-child td,
		// 	.handsontable .table caption + thead tr:first-child th,
		// 	.handsontable .table colgroup + thead tr:first-child td,
		// 	.handsontable .table colgroup + thead tr:first-child th,
		// 	.handsontable .table thead:first-child tr:first-child td,
		// 	.handsontable .table thead:first-child tr:first-child th {
		// 		border-top-color: var(--admin-accent-3)
		// 	}

		// 	.handsontable .table-bordered td:first-child,
		// 	.handsontable .table-bordered th:first-child {
		// 		border-left-color: var(--admin-accent-3)
		// 	}

		// 	.handsontable .table-striped > tbody > tr:nth-of-type(2n) {
		// 		background-color: var(--admin-bg)
		// 	}


		// 	.handsontable td,
		// 	.handsontable th {
		// 		border-right-color: var(--admin-accent-3);
		// 		border-bottom-color: var(--admin-accent-3);
		// 		background-color: var(--admin-bg);
		// 	}

		// 	.handsontable td.htInvalid {
		// 		background-color: #ff4c42 !important
		// 	}

		// 	.handsontable th:last-child {
		// 		border-right-color: var(--admin-accent-3);
		// 		border-bottom-color: var(--admin-accent-3)
		// 	}

		// 	.handsontable th.htNoFrame,
		// 	.handsontable th:first-child.htNoFrame,
		// 	.handsontable tr:first-child th.htNoFrame {
		// 		background-color: var(--admin-bg);
		// 		border-color: var(--admin-bg)
		// 	}

		// 	.handsontable .htNoFrame + td,
		// 	.handsontable .htNoFrame + th,
		// 	.handsontable.htRowHeaders thead tr th:nth-child(2),
		// 	.handsontable td:first-of-type,
		// 	.handsontable th:first-child,
		// 	.handsontable th:nth-child(2) {
		// 		border-left-color: var(--admin-accent-3)
		// 	}

		// 	.handsontable tr:first-child td,
		// 	.handsontable tr:first-child th {
		// 		border-top-color: var(--admin-accent-3)
		// 	}

		// 	.handsontable th {
		// 		background-color: var(--admin-accent-1);
		// 		color: var(--admin-accent-10);
		// 	}

		// 	.handsontable th.active {
		// 		background-color: var(--admin-accent-3)
		// 	}

		// 	#hot-display-license-info {
		// 		color: #323232;
		// 	}

		// 	.handsontable .manualColumnResizer.active,
		// 	.handsontable .manualColumnResizer:hover,
		// 	.handsontable .manualRowResizer.active,
		// 	.handsontable .manualRowResizer:hover {
		// 		background-color: #34a9db
		// 	}

		// 	.handsontable .manualColumnResizerGuide {
		// 		background-color: #34a9db;
		// 		border-right-color: #777;
		// 	}

		// 	.handsontable .manualRowResizerGuide {
		// 		background-color: #34a9db;
		// 		border-bottom-color: #777;
		// 	}

		// 	.handsontable span.colHeader.columnSorting.ascending:before {
		// 		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMABBEmRGprlJW72e77tTkTKwAAAFNJREFUeAHtzjkSgCAUBNHPgsoy97+ulGXRqJE5L+xkxoYt2UdsLb5bqFINz+aLuuLn5rIu2RkO3fZpWENimNgiw6iBYRTPMLJjGFxQZ1hxxb/xBI1qC8k39CdKAAAAAElFTkSuQmCC")
		// 	}

		// 	.handsontable span.colHeader.columnSorting.descending:before {
		// 		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMABBEmRGprlJW72e77tTkTKwAAAFJJREFUeAHtzjkSgCAQRNFmQYUZ7n9dKUvru0TmvPAn3br0QfgdZ5xx6x+rQn23GqTYnq1FDcnuzZIO2WmedVqIRVxgGKEyjNgYRjKGkZ1hFIZ3I70LyM0VtU8AAAAASUVORK5CYII=")
		// 	}

		// 	.handsontable td.area-1:before,
		// 	.handsontable td.area-2:before,
		// 	.handsontable td.area-3:before,
		// 	.handsontable td.area-4:before,
		// 	.handsontable td.area-5:before,
		// 	.handsontable td.area-6:before,
		// 	.handsontable td.area-7:before,
		// 	.handsontable td.area:before {
		// 		background: #005eff
		// 	}

		// 	.handsontable tbody th.ht__highlight,
		// 	.handsontable thead th.ht__highlight {
		// 		background-color: var(--admin-accent-2)
		// 	}

		// 	.handsontable tbody th.ht__active_highlight,
		// 	.handsontable thead th.ht__active_highlight {
		// 		background-color: #8eb0e7;
		// 		color: #000
		// 	}

		// 	.handsontable .htBorder.htFillBorder {
		// 		background: red;
		// 	}

		// 	.handsontableInput {
		// 		box-shadow: inset 0 0 0 2px #5292f7;
		// 		background-color: var(--admin-bg)
		// 	}

		// 	.handsontable .htDimmed {
		// 		color: #777
		// 	}

		// 	.handsontable .htSubmenu :after {
		// 		color: #777;
		// 	}

		// 	.handsontable .htPlaceholder {
		// 		color: #999
		// 	}

		// 	.handsontable .htAutocompleteArrow {
		// 		color: #eee;
		// 	}

		// 	.handsontable td .htAutocompleteArrow:hover {
		// 		color: #777
		// 	}

		// 	.handsontable td.area .htAutocompleteArrow {
		// 		color: #d3d3d3
		// 	}

		// 	.handsontable.listbox .ht_master table {
		// 		border-color: var(--admin-accent-3);
		// 		background: var(--admin-bg)
		// 	}

		// 	.handsontable.listbox tr:hover td,
		// 	.handsontable.listbox tr td.current {
		// 		background: #eee
		// 	}

		// 	.handsontable td.htSearchResult {
		// 		background: #fcedd9;
		// 		color: #583707
		// 	}

		// 	.htBordered.htTopBorderSolid {
		// 		border-top-color: #000
		// 	}

		// 	.htBordered.htRightBorderSolid {
		// 		border-right-color: #000
		// 	}

		// 	.htBordered.htBottomBorderSolid {
		// 		border-bottom-color: #000
		// 	}

		// 	.htBordered.htLeftBorderSolid {
		// 		border-left-color: #000
		// 	}

		// 	.handsontable tbody tr th:nth-last-child(2) {
		// 		border-right-color: var(--admin-accent-3)
		// 	}

		// 	.handsontable thead tr:nth-last-child(2) th.htGroupIndicatorContainer {
		// 		border-bottom-color: var(--admin-accent-3);
		// 	}

		// 	.ht_clone_top_left_corner thead tr th:nth-last-child(2) {
		// 		border-right-color: var(--admin-accent-3)
		// 	}

		// 	.htCollapseButton {
		// 		border-color: var(--admin-accent-1);
		// 		box-shadow: 1px 1px 3px rgba(0, 0, 0, .4);
		// 	}

		// 	.htCollapseButton:after {
		// 		background: var(--admin-accent-3);
		// 	}

		// 	thead .htCollapseButton {
		// 		background: var(--admin-bg)
		// 	}

		// 	.handsontable tr th .htExpandButton {
		// 		border-color: var(--admin-accent-1);
		// 		box-shadow: 1px 1px 3px rgba(0, 0, 0, .4);
		// 	}

		// 	.collapsibleIndicator {
		// 		border-color: #a6a6a6;
		// 		color: #222;
		// 		box-shadow: 0 0 0 6px #eee;
		// 		background: #eee
		// 	}

		// 	.handsontable table tr th.lightRightBorder {
		// 		border-right-color: #e6e6e6
		// 	}


		// 	.pika-single {
		// 		color: #333;
		// 		background: var(--admin-bg);
		// 		border-color: var(--admin-accent-3) var(--admin-accent-3) #bbb;
		// 	}

		// 	.pika-single.is-bound {
		// 		box-shadow: 0 5px 15px -5px rgba(0, 0, 0, .5)
		// 	}
		// 	.pika-label {
		// 		background-color: var(--admin-bg)
		// 	}

		// 	.is-rtl .pika-next,
		// 	.pika-prev {
		// 		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==");
		// 	}

		// 	.is-rtl .pika-prev,
		// 	.pika-next {
		// 		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=");
		// 	}

		// 	.pika-table th {
		// 		color: #999;
		// 	}

		// 	.pika-button {
		// 		color: #666;
		// 		background: #f5f5f5
		// 	}

		// 	.pika-week {
		// 		color: #999
		// 	}

		// 	.is-today .pika-button {
		// 		color: #3af;
		// 	}

		// 	.has-event .pika-button,
		// 	.is-selected .pika-button {
		// 		color: var(--admin-bg);
		// 		background: #3af;
		// 		box-shadow: inset 0 1px 3px #178fe5;
		// 	}

		// 	.has-event .pika-button {
		// 		background: #005da9;
		// 		box-shadow: inset 0 1px 3px #0076c9
		// 	}

		// 	.is-disabled .pika-button,
		// 	.is-inrange .pika-button {
		// 		background: #d5e9f7
		// 	}

		// 	.is-startrange .pika-button {
		// 		color: var(--admin-bg);
		// 		background: #6cb31d;
		// 	}

		// 	.is-endrange .pika-button {
		// 		color: var(--admin-bg);
		// 		background: #3af;
		// 	}

		// 	.is-disabled .pika-button {
		// 		color: #999;
		// 	}

		// 	.is-outside-current-month .pika-button {
		// 		color: #999;
		// 	}

		// 	.pika-button:hover,
		// 	.pika-row.pick-whole-week:hover .pika-button {
		// 		color: var(--admin-bg);
		// 		background: #ff8000;
		// 	}

		// 	.htCommentCell:after {
		// 		border-top-color: #000
		// 	}

		// 	.htCommentTextArea {
		// 		box-shadow: 0 1px 3px rgba(0, 0, 0, .117647), 0 1px 2px rgba(0, 0, 0, .239216);
		// 		border-left-color: var(--admin-accent-3);
		// 		background-color: var(--admin-bg);
		// 	}

		// 	.htCommentTextArea:focus {
		// 		box-shadow: 0 1px 3px rgba(0, 0, 0, .117647), 0 1px 2px rgba(0, 0, 0, .239216), inset 0 0 0 1px #5292f7;
		// 		border-left-color: #5292f7
		// 	}

		// 	.htContextMenu table.htCore {
		// 		border-color: var(--admin-accent-3);
		// 	}

		// 	.htContextMenu table tbody tr td {
		// 		background: var(--admin-bg);
		// 	}

		// 	.htContextMenu table tbody tr td.htDimmed {
		// 		color: #323232
		// 	}

		// 	.htContextMenu table tbody tr td.current,
		// 	.htContextMenu table tbody tr td.zeroclipboard-is-hover {
		// 		background: var(--admin-accent-1)
		// 	}

		// 	.htContextMenu table tbody tr td.htSeparator {
		// 		border-top-color: #e6e6e6;
		// 	}

		// 	.htContextMenu table tbody tr td.htDisabled {
		// 		color: #999;
		// 	}

		// 	.htContextMenu table tbody tr td.htDisabled:hover {
		// 		background: var(--admin-bg);
		// 		color: #999;
		// 	}

		// 	.handsontable .ht__manualColumnMove--guideline {
		// 		background: #757575;
		// 	}

		// 	.handsontable .ht__manualColumnMove--backlight {
		// 		background: #343434;
		// 		background: rgba(52, 52, 52, .25);
		// 	}

		// 	.handsontable .ht__manualRowMove--guideline {
		// 		background: #757575;
		// 	}

		// 	.handsontable .ht__manualRowMove--backlight {
		// 		background: #343434;
		// 		background: rgba(52, 52, 52, .25);
		// 	}

		// 	.handsontable .changeType {
		// 		background: #eee;
		// 		border-color: #bbb;
		// 		color: #bbb;
		// 	}

		// 	.handsontable .changeType:hover {
		// 		border-color: #777;
		// 		color: #777;
		// 	}

		// 	.htDropdownMenu table.htCore {
		// 		border-color: #bbb;
		// 	}

		// 	.htDropdownMenu table tbody tr td {
		// 		background: var(--admin-bg);
		// 	}

		// 	.htDropdownMenu table tbody tr td.htDimmed {
		// 		color: #323232
		// 	}

		// 	.htDropdownMenu table tbody tr td.current,
		// 	.htDropdownMenu table tbody tr td.zeroclipboard-is-hover {
		// 		background: #e9e9e9
		// 	}

		// 	.htDropdownMenu table tbody tr td.htSeparator {
		// 		border-top-color: #e6e6e6;
		// 	}

		// 	.htDropdownMenu table tbody tr td.htDisabled {
		// 		color: #999
		// 	}

		// 	.htDropdownMenu table tbody tr td.htDisabled:hover {
		// 		background: var(--admin-bg);
		// 		color: #999;
		// 	}

		// 	.htFiltersConditionsMenu table.htCore {
		// 		border-color: #bbb;
		// 	}

		// 	.htFiltersConditionsMenu table tbody tr td {
		// 		background: var(--admin-bg);
		// 	}

		// 	.htFiltersConditionsMenu table tbody tr td.htDimmed {
		// 		color: #323232
		// 	}

		// 	.htFiltersConditionsMenu table tbody tr td.current,
		// 	.htFiltersConditionsMenu table tbody tr td.zeroclipboard-is-hover {
		// 		background: #e9e9e9
		// 	}

		// 	.htFiltersConditionsMenu table tbody tr td.htSeparator {
		// 		border-top-color: #e6e6e6;
		// 	}

		// 	.htFiltersConditionsMenu table tbody tr td.htDisabled {
		// 		color: #999
		// 	}

		// 	.htFiltersConditionsMenu table tbody tr td.htDisabled:hover {
		// 		background: var(--admin-bg);
		// 		color: #999;
		// 	}

		// 	.handsontable .htMenuFiltering {
		// 		border-bottom-color: var(--admin-accent-3);
		// 	}

		// 	.handsontable .ht_master table td.htCustomMenuRenderer {
		// 		background-color: var(--admin-bg);
		// 	}

		// 	.handsontable .htFiltersMenuCondition.border {
		// 		border-bottom-color: var(--admin-accent-3) !important
		// 	}

		// 	.handsontable .htFiltersMenuValue {
		// 		border-bottom-color: var(--admin-accent-3) !important
		// 	}

		// 	.handsontable .htFiltersActive .changeType {
		// 		border-color: #509272;
		// 		color: #18804e;
		// 		background-color: #d2e0d9
		// 	}

		// 	.handsontable .htUIClearAll a,
		// 	.handsontable .htUISelectAll a {
		// 		color: #3283d8;
		// 	}

		// 	.handsontable .htUIInput input {
		// 		border-color: #d2d1d1
		// 	}

		// 	.handsontable .htUIInput.htUIButton input {
		// 		background-color: #eee;
		// 		color: #000;
		// 	}

		// 	.handsontable .htUIInput.htUIButton input:hover {
		// 		border-color: #b9b9b9
		// 	}

		// 	.handsontable .htUIInput.htUIButtonOK input {
		// 		background-color: #0f9d58;
		// 		border-color: #18804e;
		// 		color: var(--admin-bg)
		// 	}

		// 	.handsontable .htUIInput.htUIButtonOK input:hover {
		// 		border-color: #1a6f46
		// 	}

		// 	.handsontable .htUISelectCaption {
		// 		background-color: #e8e8e8;
		// 		border-color: #d2d1d1;
		// 	}

		// 	.handsontable .htUISelectCaption:hover {
		// 		background-color: #e8e8e8;
		// 		border-color: #b9b9b9
		// 	}

		// 	.handsontable .htUIMultipleSelect .handsontable .htCore td:hover {
		// 		background-color: #f5f5f5
		// 	}

		// 	.handsontable .htUIMultipleSelectSearch input {
		// 		border-color: #d2d1d1;
		// 	}

		// 	.handsontable.ganttChart td.rangeBar {
		// 		background: #48b703;
		// 		box-shadow: inset 0 3px 0 var(--admin-bg)
		// 	}

		// 	.handsontable.ganttChart td.rangeBar.area {
		// 		background: #7ec481
		// 	}

		// 	.handsontable.ganttChart td.rangeBar.partial {
		// 		background: #8edf5a
		// 	}

		// 	.handsontable.ganttChart td.rangeBar.area.partial {
		// 		background: #a1d8ad
		// 	}

		// 	.handsontable th.afterHiddenColumn:before,
		// 	.handsontable th.beforeHiddenColumn:after {
		// 		color: #bbb;
		// 	}


		// 	.handsontable td.firstVisibleColumn,
		// 	.handsontable th.firstVisibleColumn {
		// 		border-left-color: var(--admin-accent-3)
		// 	}

		// 	.handsontable th.afterHiddenRow:after,
		// 	.handsontable th.beforeHiddenRow:before {
		// 		color: #bbb;
		// 	}

		// 	.handsontable.ht__selection--rows tbody th.afterHiddenRow.ht__highlight:after,
		// 	.handsontable.ht__selection--rows tbody th.beforeHiddenRow.ht__highlight:before {
		// 		color: #eee
		// 	}

		// 	.handsontable td.afterHiddenRow.firstVisibleRow,
		// 	.handsontable th.afterHiddenRow.firstVisibleRow {
		// 		border-top-color: var(--admin-accent-3)
		// 	}


		// }
	}
</style>
