<Navigation {story}/>
<!-- <p>{sequence}</p> -->
<!-- <p>{JSON.stringify($page.params)}</p> -->
<!-- <p>{JSON.stringify(story.rootclip.sequences[0].clips[0])}</p> -->
<!-- <p>{JSON.stringify(story)}</p> -->

<div class="story-layout">
	{#if story && sequence}
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

	$: sequence = story.rootclip.sequences.find(seq => seq.title.toLowerCase() === $page.params.sequence)
		|| story.rootclip.sequences[0]

	import Clip from './Clip.svelte'

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