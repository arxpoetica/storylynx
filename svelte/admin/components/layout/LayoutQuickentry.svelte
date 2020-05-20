<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
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
	// import Button from '../elements/Button.svelte'

	export let model = ''
	export let asset_groups
	export let content_types
	export let subjects

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
			{ readOnly: true, colWidths: '186rem', renderer: html_renderer }, // Assets
			{ colWidths: '300rem' }, // Title
			{ colWidths: '300rem' }, // Summary
			{ type: 'dropdown', source: content_types }, // Content Type
			{}, // Year
			{ type: 'dropdown', source: subjects }, // Subject
			// FIXME: make this editable later.........
			{ readOnly: true }, // Tags
			{ colWidths: '300rem' }, // Source
		],
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
