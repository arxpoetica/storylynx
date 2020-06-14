<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<Button title="Save Asset Groups" disabled={!$saveable} handler={save}/>

		<!-- <Button {href} title="Create {singular}"/> -->
	</div>
	<!-- <div class="tools"></div> -->
	<div class="content">
		<EditTable {options}/>
	</div>
</div>
<slot></slot>

<script>
	import { onDestroy } from 'svelte'
	import EditTable from '../widgets/EditTable.svelte'
	import Button from '../elements/Button.svelte'

	export let model = ''
	export let asset_groups
	export let content_types
	export let subjects
	$: valid_types = [null, ...content_types]
	$: valid_subjects = [null, ...subjects]

	import { saving, saveable, hot, hot_changes } from '../../../../stores/admin-store.js'

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session } = get_sapper_stores()
	import { POST } from '../../../../utils/loaders.js'

	async function save(event) {
		$saving = true
		for (let change of $hot_changes) {
			const payload = Object.assign({ cookie: $session.cookie }, change)
			const { asset_group } = await POST('/api/admin/assets/quickentry-update.post', payload)
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
	.content-view {
		display: grid;
		// grid-template-rows: auto auto 1fr;
		grid-template-rows: auto 1fr;
		grid-template-columns: 1fr;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 62rem;
		padding: 12rem;
		border-bottom: 1px solid var(--admin-accent-2);
	}
	// .tools {}
	.content {
		position: relative;
		overflow: hidden;
	}
</style>
