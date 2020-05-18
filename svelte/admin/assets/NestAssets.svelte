{#if $assets}
	<div class="nest">
		{#each $assets as item, index}
			{#if item.mime_type.includes('image')}
				<NestEgg {item} {index} handler={move_to_group}/>
			{/if}
		{/each}
	</div>
{/if}

<script>
	import { assets, current_group, groups }
		from '../../../stores/admin-store.js'

	import NestEgg from './NestEgg.svelte'

	function move_to_group(item, index) {
		if ($current_group > -1) {
			const group = $groups[$current_group]

			if (group.changes && group.changes.disconnect_ids && group.changes.disconnect_ids.includes(item.id)) {
				const id_index = group.changes.disconnect_ids.indexOf(item.id)
				group.changes.disconnect_ids.splice(id_index, 1)
				if (!group.changes.disconnect_ids.length) {
					delete group.changes.disconnect_ids
				}
			} else {
				group.changes = group.changes || {}
				group.changes.connect_ids = group.changes.connect_ids || []
				group.changes.connect_ids.push(item.id)
			}

			$assets.splice(index, 1)
			$assets = $assets

			group.assets = [...group.assets, item]
			$groups = $groups
		} else {
			alert('Please select a group on the right to add this asset to.')
		}
	}
</script>

<style type="text/scss">
	.nest {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200rem, 1fr));
		grid-gap: 10rem;
	}
</style>
