<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<Button title="Save Asset Groups" disabled={!$saveable} handler={save}/>
	</div>
	<!-- <div class="tools"></div> -->
	<div class="content">
		<div class="col col-assets">
			<QuickarrangeToolbar items={assets} title="Ungrouped Assets"/>
			<QuickarrangeAssets/>
		</div>
		<div bind:this={groups_col} class="col col-groups">
			<QuickarrangeToolbar items={groups} title="Grouped Assets" type="green">
				<div class="bar">
					<Button title="Add Group" handler={add_group} classes="good"/>
				</div>
			</QuickarrangeToolbar>
			{#if $groups}
				<div class="groups">
					{#each $groups as group, g_index (group.id)}
						<QuickarrangeGroup {group} {g_index}/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
<AssetPreview/>
<slot></slot>

<script>
	export let model = ''
	export let ungrouped_assets = []
	export let asset_groups = []

	import Button from '../elements/Button.svelte'
	import QuickarrangeToolbar from '../../assets/QuickarrangeToolbar.svelte'
	import QuickarrangeAssets from '../../assets/QuickarrangeAssets.svelte'
	import QuickarrangeGroup from '../../assets/QuickarrangeGroup.svelte'
	import AssetPreview from './AssetPreview.svelte'

	import uid from 'uid'
	import { saving, saveable, assets, current_group, groups } from '../../../../stores/admin-store.js'

	let groups_col
	function add_group(event) {
		groups_col.scrollTop = 0
		$groups = [{
			id: 'NOID-' + uid(),
			title: `Untitled Group`,
			assets: [],
			changes: {},
		}, ...$groups]
		$current_group = 0
		const input = groups_col.querySelector('input:first-child')
		input.focus()
		setTimeout(() => input.select(), 0)
	}

	$: $saveable = $groups.filter(group => group.changes).length

	async function save(event) {
		const buttons = groups_col.querySelectorAll('.button-save')
		for (let button of buttons) {
			button.click()
		}
	}

	import { onMount, onDestroy } from 'svelte'
	onMount(() => {
		$assets = ungrouped_assets
		$groups = asset_groups
	})
	onDestroy(() => {
		// FIXME:
		// if (window.confirm('You have unsaved items? Are you sure you want to leave?')) { 
			// TODO: make this a generic reset util function somewhere...
			$assets = []
			$current_group = -1
			$groups = []
			$saveable = false
			$saving = false
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
		border-bottom: 1rem solid var(--admin-accent-2);
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
		border-right: 1rem solid var(--admin-accent-2);
		&:last-child { border: 0; }

		// TODO: make this a reusable container component
		&::-webkit-scrollbar { width: 12rem;}
		&::-webkit-scrollbar-track {
			background-color: var(--admin-accent-2);
		}
		&::-webkit-scrollbar-thumb {
			background-color: var(--admin-accent-4);
			border-left: 1rem solid var(--admin-accent-2);
			border-radius: 12rem;
		}
	}
	.bar {
		margin: 20rem 0 0;
	}
</style>
