<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<Button title="Save Asset Groups" disabled={!$saveable} handler={save}/>
	</div>
	<!-- <div class="tools"></div> -->
	<div class="content">
		<div class="col col-assets">
			<NestToolbar items={assets} title="Ungrouped Assets"/>
			<NestAssets/>
		</div>
		<div class="col col-groups">
			<NestToolbar items={groups} title="Grouped Assets" type="green">
				<div class="bar">
					<Button title="Add Group" handler={add_group} classes="good"/>
				</div>
			</NestToolbar>
			<NestGroups/>
		</div>
	</div>
</div>
{#if $egg_preview}
	<AssetPreview/>
{/if}
<slot></slot>

<script>
	export let model = ''
	export let ungrouped_assets = []
	export let asset_groups = []

	import Button from '../elements/Button.svelte'
	import NestToolbar from '../../assets/NestToolbar.svelte'
	import NestAssets from '../../assets/NestAssets.svelte'
	import NestGroups from '../../assets/NestGroups.svelte'
	import AssetPreview from './AssetPreview.svelte'

	import uid from 'uid'
	import { saving, saveable, assets, current_group, groups, egg_preview } from '../../../../stores/admin-store.js'

	function add_group(event) {
		$groups = [{
			id: 'NOID-' + uid(),
			title: `Untitled Group`,
			assets: [],
			changes: {},
		}, ...$groups]
		$current_group = 0
	}

	$: $saveable = $groups.filter(group => {
		if (group.changes) {
			return (group.changes.connect_ids && group.changes.connect_ids.length)
				|| (group.changes.disconnect_ids && group.changes.disconnect_ids.length)
		}
		return false
	}).length

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session } = get_sapper_stores()
	import { POST } from '../../../../utils/loaders.js'

	async function save(event) {
		$saving = true
		for (let group of $groups) {
			if (group.changes && (group.changes.connect_ids || group.changes.disconnect_ids)) {
				const payload = Object.assign({ cookie: $session.cookie }, {
					id: group.id,
					title: group.title,
					connect_ids: group.changes.connect_ids || [],
					disconnect_ids: group.changes.disconnect_ids || [],
				})
				const { asset_group } = await POST('/api/admin/assets/quickarrange-upsert.post', payload)
				delete group.changes
				group.id = asset_group.id
			}
		}
		$groups = $groups
		$saving = false
	}

	import { onMount, onDestroy } from 'svelte'
	onMount(() => {
		$assets = ungrouped_assets
		$groups = asset_groups
	})
	onDestroy(() => {
		// FIXME:
		// if (window.confirm('You have unsaved items? Are you sure you want to leave?')) { 
		// 	$assets = []
		// 	$current_group = -1
		// 	$groups = []
		// }
	})
</script>

<style type="text/scss">
	.content-view {
		display: grid;
		grid-template-rows: auto auto 1fr;
		grid-template-columns: 1fr;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 62rem;
		padding: 12rem;
		border-bottom: 1rem solid var(--admin-gray-light);
	}
	// .tools {
	// }
	.content {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.col {
		position: relative;
		overflow: auto;
		height: calc(100vh - 62rem);
		padding: 40rem;
		border-right: 1rem solid var(--admin-gray-light);
		&:last-child {
			border: 0;
		}
	}
	.bar {
		margin: 20rem 0 0;
	}
</style>
