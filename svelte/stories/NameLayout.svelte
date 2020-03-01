<StoriesNavigation {navigation}/>
<div class="layout-main">
	<div class="box">
		<slot name="pre-content"></slot>

		{#if story}
			{#each story.rootclip.sequences as sequence}
				<div class="sequence {sequence.classes ? sequence.classes : ''}">
					<div class="clips">
						{#each sequence.clips as clip}
							<Clip {clip}/>
						{/each}
					</div>
				</div>
			{/each}
		{/if}

		<slot name="post-content"></slot>
	</div>
</div>

<script>
	export let navigation
	import StoriesNavigation from './StoriesNavigation.svelte'

	export let story
	import Clip from './Clip.svelte'

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	const html = html => html ? html.replace(/<p><\/p>/gi, '') : ''
</script>

<style type="text/scss">
	.sequence {
		padding: 50rem;
		border: 3px solid black;
	}
</style>
