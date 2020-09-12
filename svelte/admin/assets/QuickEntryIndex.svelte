<Scaffolding title="Assets Quick Entry" fullwidth={true} actions={true}>

	<div class="actions" slot="actions">
		<Button title="Save Asset Groups" disabled={!$saveable} handler={save}/>
	</div>

	<div class="quick-entry">
		<EditTable {options}/>
	</div>

</Scaffolding>

<script>
	import { onDestroy } from 'svelte'
	import Scaffolding from '../components/layout/Scaffolding.svelte'
	import EditTable from '../components/widgets/EditTable.svelte'
	import Button from '../components/elements/Button.svelte'

	export let asset_groups
	export let content_types
	export let subjects
	$: valid_types = [null, ...content_types]
	$: valid_subjects = [null, ...subjects]

	import { saving, saveable, hot, hot_changes } from '../../../stores/admin-store.js'
	import { POST } from '../../../utils/loaders.js'

	async function save(event) {
		$saving = true
		for (let change of $hot_changes) {
			const { asset_group } = await POST('/api/admin/assets/quickentry-update.post', change, true)
		}
		$hot_changes = []
		$saveable = false
		$saving = false
	}

	$: options = {
		data: asset_groups.map(group => {
			return [
				group.id,
				format_asset_data(group.assets),
				group.title,
				group.caption,
				group.content_type,
				group.year,
				group.subject,
				group.tags.join(', '),
				group.source,
				group.detail,
			]
		}),
		colHeaders: [
			'ID',
			'Assets',
			'Title',
			'Caption',
			'Content Type',
			'Year',
			'Subject',
			'Tags',
			'Source',
			'Detail',
		],
		columns: [
			{ readOnly: true }, // ID
			{ readOnly: true, colWidths: '188rem', wordWrap: false, renderer: html_renderer }, // Assets
			{ colWidths: '300rem', wordWrap: false }, // Title
			{ colWidths: '300rem', wordWrap: false }, // Caption
			{ type: 'dropdown', source: valid_types, validator: (value, cb) => cb(valid_types.includes(value)) }, // Content Type
			{ validator: 'numeric' }, // Year
			{ type: 'dropdown', source: valid_subjects, validator: (value, cb) => cb(valid_subjects.includes(value)) }, // Subject
			// FIXME: make this editable later.........
			{ readOnly: true }, // Tags
			{ colWidths: '300rem', wordWrap: false }, // Source
			{ colWidths: '300rem', wordWrap: false }, // Detail
		],
		rowHeights: 60,
		autoWrapRow: false,
		autoWrapCol: false,
		// doing some very crude validation:
		beforeChange: changes => {
			for (let change of changes) {
				// const row_index = change[0]
				const col_index = change[1]
				let prior_value = change[2]
				let value = change[3]
				if (prior_value !== value) {
					const column = options.colHeaders[col_index]
					if (column === 'Content Type') {
						return valid_types.includes(value)
					} else if (column === 'Subject') {
						return valid_subjects.includes(value)
					}
				}
			}
		},
	}

	function format_asset_data(assets) {
		const data = assets
			.map(asset => {
				asset.src = asset.mime_type.includes('image')
					? `//media.graphcms.com/output=format:jpg/resize=width:59,height:59,fit:crop/${asset.handle}`
					: `//media.graphcms.com/${asset.handle}`
				return asset
			})
			.filter((asset, index) => index < 3)
		return JSON.stringify(data)
	}

	function html_renderer (instance, td, row, col, prop, value, cellProperties) {

		const assets = JSON.parse(value)
		// const escaped = Handsontable.helper.stringify(value)

		Handsontable.dom.empty(td)

		const div = document.createElement('div')
		div.classList.add('quick-assets')

		for (let asset of assets) {
			let elem

			if (asset.mime_type.includes('image')) {
				elem = document.createElement('img')
				elem.src = asset.src
				elem.classList.add('img')
				elem.alt = asset.filename
			} else {
				elem = document.createElement('div')
				elem.classList.add('empty')
				elem.innerHTML = asset.mime_type
			}
			// Handsontable.dom.addEvent(img, 'mousedown', event => {
			// 	event.preventDefault()
			// })
			div.appendChild(elem)
		}

		td.classList.add('htDimmed')
		td.appendChild(div)
		return td
	}

	onDestroy(() => {
		// TODO: make this a generic function somewhere
		$saveable = false
		$saving = false
	})
</script>

<style type="text/scss">
	// .actions[slot="actions"] {
	// 	justify-content: flex-end !important;
	// }
	.quick-entry {
		overflow: hidden;
		position: relative;
		height: calc(100vh - 150rem);
		margin: 0 0 -40rem;
	}
</style>
