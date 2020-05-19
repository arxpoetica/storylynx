{#if $groups}
	<div class="groups">
		{#each $groups as group, g_index}
			<div class="group" class:current={$current_group === g_index} on:click={() => select_group(g_index)}>
				<div class="header">
					<div class="texts">
						<input type="text" bind:value={group.title}/>
						{#if $current_group === g_index && !group.assets.length}
							<h4>No assets. Please select some from the left.</h4>
						{/if}
					</div>
					{#if $current_group === g_index && !$saveable}
						<div class="tools">
							<Button title="Delete" classes="alert tiny" handler={() => delete_group(group, g_index)}/>
						</div>
					{/if}
				</div>
				<div class="eggs">
					{#if group.assets.length}
						{#each group.assets as item, index}
							<NestEgg {item} {index} handler={remove_from_group} size="small"/>
						{/each}
					{/if}
				</div>
				{#if $current_group !== g_index}
					<div class="shield"></div>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<script>
	import Button from '../components/elements/Button.svelte'
	import { saving, saveable, assets, current_group, groups } from '../../../stores/admin-store.js'
	import NestEgg from './NestEgg.svelte'

	function select_group(index) {
		$current_group = index
	}

	function remove_from_group(item, index) {
		const group = $groups[$current_group]

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

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session } = get_sapper_stores()
	import { POST } from '../../../utils/loaders.js'

	async function delete_group(group, index) {
		$saving = true

		if (!group.id.includes('NOID-') && window.confirm('Are you sure you want to delete this group? This is not recoverable.')) { 
			const payload = Object.assign({ cookie: $session.cookie }, { id: group.id })
			const { asset_group } = await POST('/api/admin/assets/quickarrange-delete.post', payload)
		}

		$groups.splice(index, 1)
		$groups = $groups

		$assets = [...$assets, ...group.assets]
		$assets.sort((one, two) => one.filename.localeCompare(two.filename))
		$assets = $assets

		$saving = false
	}
</script>

<style type="text/scss">
	// .groups {}
	.header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin: 0 0 20rem;
	}
	.tools {
		margin: 0 0 0 20rem;
	}
	input {
		margin: 0;
		padding: 0;
		color: var(--admin-text);
		border: 0;
		background-color: transparent;
		box-shadow: none;
		font: bold 15rem/1 var(--admin-font);
		text-overflow: ellipsis;
		&:focus {
			padding: 5rem;
			color: var(--admin-text);
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
		padding: 20rem;
		margin: 0 0 10rem;
		background-color: var(--admin-blue-faint);
		border: 1rem solid var(--admin-blue-lighter);
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
			background-color: rgba(255, 255, 255, 0.5);
			opacity: 0;
			pointer-events: none;
		}
		&:hover:after {
			opacity: 1;
		}
		&.current {
			background-color: var(--admin-blue-lighter);
			border-color: var(--admin-blue-dark);
			&:after { display: none; }
		}
	}
	.eggs {
		display: grid;
		grid-template-columns: repeat(auto-fit, 75rem);
		grid-gap: 10rem;
	}
</style>
