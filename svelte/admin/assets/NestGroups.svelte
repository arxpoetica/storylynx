{#if $groups}
	{#each $groups as group}
		<div class="group">
			{#each group.assets as item, index}
				<NestEgg {item} {index} handler={remove_from_group}/>
			{/each}
		</div>
	{/each}
{/if}

<script>
	import { assets, current_group, groups, nest_saved } from '../../../stores/admin-store.js'
	import NestEgg from './NestEgg.svelte'

	function remove_from_group(item, index) {
		console.log('talo')
		// groups.set([...$groups, item])
	}
</script>

<style type="text/scss">
	.group {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120rem, 1fr));
		grid-gap: 10rem;
	}
</style>
