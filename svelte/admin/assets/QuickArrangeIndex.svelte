<Scaffolding title="Assets Quick Arrange" fullwidth={true} actions={true}>

	<div class="actions" slot="actions">
		<Button label="Save Asset Groups" disabled={!$saveable} handler={save}/>
	</div>

	<div class="columns">
		<div class="col col-assets">
			<QuickarrangeToolbar items={assets} title="Ungrouped Assets"/>
			<QuickarrangeAssets/>
		</div>
		<div bind:this={groups_col} class="col col-groups">
			<QuickarrangeToolbar items={groups} title="Grouped Assets" type="green">
				<div class="bar">
					<Button label="Add Group" handler={add_group} classes="good"/>
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

</Scaffolding>

<script>
	export let ungrouped_assets = []
	export let asset_groups = []

	import Scaffolding from '../components/layout/Scaffolding.svelte'
	import Button from '../components/elements/Button.svelte'
	import QuickarrangeToolbar from './components/QuickarrangeToolbar.svelte'
	import QuickarrangeAssets from './components/QuickarrangeAssets.svelte'
	import QuickarrangeGroup from './components/QuickarrangeGroup.svelte'

	import uid from 'uid'
	import { saving, saveable, assets, current_group, groups } from '../../../stores/admin-store.js'

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
	// .actions[slot="actions"] {
	// 	justify-content: flex-end !important;
	// }
	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 0 0 -40rem;
		border-top: 1rem solid var(--admin-accent-2)
	}
	.col {
		position: relative;
		overflow: auto;
		height: calc(100vh - 151rem);
		padding: 40rem;
		border-right: 1rem solid var(--admin-accent-2);
		&:last-child { border: 0; }

		@mixin scrollbar {}
	}
	.bar {
		margin: 20rem 0 0;
	}
</style>
