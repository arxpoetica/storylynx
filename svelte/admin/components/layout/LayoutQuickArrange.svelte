<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<Button title="Save Asset Groups" disabled={$nest_saved} handler={save}/>
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
<slot></slot>

<script>
	export let model = ''
	export let ungrouped_assets = []
	export let asset_groups = []

	import Button from '../elements/Button.svelte'
	import NestToolbar from '../../assets/NestToolbar.svelte'
	import NestAssets from '../../assets/NestAssets.svelte'
	import NestGroups from '../../assets/NestGroups.svelte'

	import uid from 'uid'
	import { assets, current_group, groups, nest_saved } from '../../../../stores/admin-store.js'

	function add_group(event) {
		$groups = [{ title: `Untitled Group "${uid()}"`, assets: [] }, ...$groups]
		$current_group = 0
		$nest_saved = false
	}
	function save(event) {
		$nest_saved = true
	}

	import { onMount, onDestroy } from 'svelte'
	onMount(() => {
		$assets = ungrouped_assets
		$groups = asset_groups
	})
	onDestroy(() => {
		if (!$nest_saved && window.confirm('You have unsaved items? Are you sure you want to leave?')) { 
			$assets = []
			$current_group = -1
			$groups = []
			$nest_saved = true
		}
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
