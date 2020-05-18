{#if $assets}
	<div class="nest">
		{#each $assets as item, index}
			{#if index < 50 && item.mime_type.includes('image')}
				<NestEgg {item} {index} handler={move_to_group}/>
			{/if}
		{/each}
	</div>
{/if}

<script>
	import { assets, current_group, groups, nest_saved } from '../../../stores/admin-store.js'
	import NestEgg from './NestEgg.svelte'

	function move_to_group(item, index) {
		$nest_saved = false
		// groups.set([...$groups, item])
	}
</script>

<style type="text/scss">
	.nest {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120rem, 1fr));
		grid-gap: 10rem;
	}
</style>
