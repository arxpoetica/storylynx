<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<!-- <Button title="Save Asset Groups" disabled={!$saveable} handler={save}/> -->
	</div>
	<div class="tools"></div>
	<div class="content">
		<!-- <div class="col col-assets">
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
		</div> -->
	</div>
</div>
<slot></slot>

<script>
	export let model = ''
	// export let ungrouped_assets = []
	// export let asset_groups = []

	import Button from '../elements/Button.svelte'
	import ActionsBar from '../widgets/ActionsBar.svelte'
	import ContentList from '../widgets/ContentList.svelte'

	// import uid from 'uid'
	// import { saving, saveable, assets, current_group, groups, egg_preview } from '../../../../stores/admin-store.js'

	// import { onMount, onDestroy } from 'svelte'
	// onMount(() => {
	// 	$assets = ungrouped_assets
	// 	$groups = asset_groups
	// })
	// onDestroy(() => {
	// 	// FIXME:
	// 	// if (window.confirm('You have unsaved items? Are you sure you want to leave?')) { 
	// 		// TODO: make this a generic reset util function somewhere...
	// 		$assets = []
	// 		$current_group = -1
	// 		$groups = []
	// 		$saveable = false
	// 		$saving = false
	// 	// }
	// })
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
	// .col {
	// 	position: relative;
	// 	overflow: auto;
	// 	height: calc(100vh - 62rem);
	// 	padding: 40rem;
	// 	border-right: 1rem solid var(--admin-gray-light);
	// 	&:last-child {
	// 		border: 0;
	// 	}
	// }
	// .bar {
	// 	margin: 20rem 0 0;
	// }
</style>
