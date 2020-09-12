<div
	class="group"
	class:current={$current_group === g_index}
	class:changes={group.changes}
	on:click={() => select_group(g_index)}
>
	<div class="header">
		<div class="texts">
			<input type="text" bind:value={group.title} placeholder="Give this group a title..."/>
			{#if $current_group === g_index && !group.assets.length}
				<h4>No assets. Please select some from the left.</h4>
			{/if}
		</div>
		{#if group.changes || $current_group === g_index}
			<div class="tools">
				{#if group.changes}
					<Button title="Save" classes="button-save tiny" handler={() => save_group(group, g_index)}/>
				{:else if $current_group === g_index}
					<Button title="Delete" classes="alert tiny" handler={() => delete_group(group, g_index)}/>
				{/if}
			</div>
		{/if}
	</div>
	{#if group.assets.length}
		<div
			class="eggs"
			use:dndzone={ { items: group.assets, dropTargetStyle: false } }
			on:consider={sort_group}
			on:finalize={sort_group}
		>
			{#each group.assets as item, index (item.id)}
				<QuickarrangeThumb {item} {index} handler={remove_from_group} size="small"/>
			{/each}
		</div>
	{/if}
	{#if $current_group !== g_index}
		<div class="shield"></div>
	{/if}
</div>

<script>
	export let group
	export let g_index

	import { dndzone } from 'svelte-dnd-action'
	import Button from '../../components/elements/Button.svelte'
	import { saving, assets, current_group, groups } from '../../../../stores/admin-store.js'
	import QuickarrangeThumb from './QuickarrangeThumb.svelte'

	function select_group(index) {
		$current_group = index
	}

	let original_title = group.title
	$: if (original_title === group.title && group.changes && !Object.keys(group.changes).length) {
		$groups[g_index].changes = undefined
	} else if (original_title !== group.title && !group.changes) {
		$groups[g_index].changes = {} // all we have to do is track there are changes
	} else if ($saving && original_title !== group.title && group.changes) {
		original_title = group.title
		$groups[g_index].changes = undefined
	}

	function sort_group(event) {
		const group = $groups[g_index]
		group.assets = [...event.detail.items]
		if (event.type === 'finalize') {
			group.changes = group.changes || {}
			group.changes.order = group.assets.map(asset => asset.id)
		}
		$groups = $groups
	}

	function remove_from_group(item, index) {
		const group = $groups[g_index]

		if (group.changes && group.changes.connect_ids && group.changes.connect_ids.includes(item.id)) {
			const id_index = group.changes.connect_ids.indexOf(item.id)
			group.changes.connect_ids.splice(id_index, 1)
			// just cleaning up
			if (!group.changes.connect_ids.length) {
				delete group.changes.connect_ids
			}
		} else {
			group.changes = group.changes || {}
			group.changes.disconnect_ids = group.changes.disconnect_ids || []
			group.changes.disconnect_ids.push(item.id)
		}

		group.assets.splice(index, 1)
		$groups = $groups

		$assets = [...$assets, item]
		$assets.sort((one, two) => one.filename.localeCompare(two.filename))
		$assets = $assets
	}

	import { POST } from '../../../../utils/loaders.js'
	async function save_group(group, index) {
		$saving = true
		if (group.changes) {
			const payload = {
				id: group.id,
				title: group.title,
				connect_ids: group.changes.connect_ids || [],
				disconnect_ids: group.changes.disconnect_ids || [],
				order: group.changes.order || [],
			}
			const { asset_group } = await POST('/api/admin/assets/quickarrange-upsert.post', payload, true)
			group.changes = undefined
			// replace `NOID-` with real id:
			group.id = asset_group.id
			$groups[g_index] = $groups[g_index]
		}
		$saving = false
	}

	async function delete_group(group, index) {
		$saving = true

		if (!group.id.includes('NOID-') && window.confirm('Are you sure you want to delete this group? This is not recoverable.')) { 
			const { asset_group } = await POST('/api/admin/assets/quickarrange-delete.post', { id: group.id }, true)
			$groups.splice(index, 1)
			$groups = $groups

			$assets = [...$assets, ...group.assets]
			$assets.sort((one, two) => one.filename.localeCompare(two.filename))
			$assets = $assets
		}

		$saving = false
	}
</script>

<style type="text/scss">
	.header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin: 0 0 4rem;
	}
	.texts {
		flex: 1;
	}
	.tools {
		margin: 0 0 0 20rem;
	}
	input {
		margin: 0;
		padding: 0;
		border: 0;
		background-color: transparent;
		box-shadow: none;
		font: bold 15rem/1 var(--admin-font);
		text-overflow: ellipsis;
		&:focus {
			padding: 5rem;
			color: var(--admin-text);
			background-color: transparent;
		}
	}
	h4 {
		margin: 8rem 0 0;
		font: 13rem/1 var(--admin-font);
	}
	.shield {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		border-radius: 20rem;
		cursor: pointer;
	}
	.group {
		position: relative;
		padding: 25rem;
		margin: 0 0 40rem;
		background-color: var(--admin-accent-1);
		border-radius: 15rem;
		// box-shadow: var(--admin-shadow);
		&:after {
			content: 'Click to select';
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: -1rem;
			right: -1rem;
			bottom: -1rem;
			left: -1rem;
			background-color: rgba(var(--admin-accent-0-rgb), 0.9);
			border-radius: 15rem;
			opacity: 0;
			pointer-events: none;
		}
		&:hover:after {
			opacity: 1;
		}
		&.current {
			background-color: var(--admin-accent-0);
			box-shadow: 0 0 0 transparent;
			&:after { display: none; }
			:global(.scheme-light) & { background-color: var(--admin-accent-2); }
		}
		&.changes {
			box-shadow: 0 0 0 4rem var(--admin-color-6);
		}
	}
	@media (prefers-color-scheme: light) {
		.group.current { background-color: var(--admin-accent-2); }
	}
	.eggs {
		display: grid;
		grid-template-columns: repeat(auto-fit, 59rem);
		grid-gap: 10rem;
	}
</style>
