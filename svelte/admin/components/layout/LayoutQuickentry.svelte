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
				group.summary,
				group.content_type,
				group.year,
				group.subject,
				group.tags.join(', '),
				group.source,
			]
		}),
		colHeaders: [
			'ID',
			'Assets',
			'Title',
			'Summary',
			'Content Type',
			'Year',
			'Subject',
			'Tags',
			'Source'
		],
		columns: [
			{ readOnly: true }, // ID
			{ readOnly: true, colWidths: '188rem', wordWrap: false, renderer: html_renderer }, // Assets
			{ colWidths: '300rem', wordWrap: false }, // Title
			{ colWidths: '300rem', wordWrap: false }, // Summary
			{ type: 'dropdown', source: ['', ...content_types] }, // Content Type
			{}, // Year
			{ type: 'dropdown', source: ['', ...subjects] }, // Subject
			// FIXME: make this editable later.........
			{ readOnly: true }, // Tags
			{ colWidths: '300rem', wordWrap: false }, // Source
		],
		rowHeights: 60,
		autoWrapRow: false,
		autoWrapCol: false,
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
		border-bottom: 1px solid var(--admin-gray-light);
	}
	// .tools {}
	.content {
		position: relative;
		overflow: hidden;
	}
</style>
