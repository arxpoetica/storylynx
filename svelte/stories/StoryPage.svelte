<svelte:window bind:innerHeight={$view_height}/>

<Navigation {story}/>

<div class="story-layout">
	{#if story}
		<!-- SEE: https://github.com/sveltejs/svelte/issues/1469 for teh reason for teh key madness -->
		{#each [story.sequence] as sequence (sequence.id)}
			<Sequence sequence={sequence}/>
		{/each}
	{/if}
</div>

<script>
	export let story

	import { view_height } from '../../stores/story-store.js'

	import Sequence from './Sequence.svelte'
	import Navigation from './layout/Navigation.svelte'

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()
</script>

<style type="text/scss">
	.story-layout {
		position: relative;
		z-index: 1;
	}
</style>
