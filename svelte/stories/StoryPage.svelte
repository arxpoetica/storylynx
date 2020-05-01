<svelte:window bind:innerHeight={$view_height}/>

<Navigation {story}/>

<div class="story-layout">
	{#if story && sequence}
		<Toolbar/>
		<div class="sequence {sequence.classes ? sequence.classes : ''}">
			<div class="clips">
				{#each sequence.clips as clip}
					<Clip {clip}/>
				{/each}
			</div>
		</div>
		<InlineNavigation {story}/>
	{/if}
</div>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	export let story
	import Navigation from './Navigation.svelte'
	import InlineNavigation from './InlineNavigation.svelte'
	import { view_height } from '../../stores/story-store.js'

	$: sequence = story.sequences.find(seq => seq.slug.toLowerCase() === $page.params.sequence)
		|| story.sequences[0]

	import Clip from './Clip.svelte'
	import Toolbar from './Toolbar.svelte'

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	const html = html => html ? html.replace(/<p><\/p>/gi, '') : ''
</script>

<style type="text/scss">
	.sequence {
		margin: 50rem;
		padding: 50rem;
		border: 1px solid gray;
	}
</style>
