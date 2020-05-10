<svelte:window bind:innerHeight={$view_height}/>

<Navigation {story}/>

<div class="story-layout">
	{#if story && sequence}
		<div class="audio">
			{#each sequence.audio_clips as audio_clip}
				{#if $seq_audio[audio_clip.id]}
					<ClipAudio intersecting={$seq_audio[audio_clip.id].intersecting} asset={audio_clip.audio_asset}/>
				{/if}
			{/each}
		</div>
		<div class="sequence {sequence.classes ? sequence.classes : ''}">
			{#each sequence.clips as clip}
				<Clip {clip}/>
			{/each}
		</div>
		<InlineNavigation {story}/>
	{/if}
</div>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	export let story
	import Navigation from './layout/Navigation.svelte'
	import InlineNavigation from './layout/InlineNavigation.svelte'
	import { view_height, seq_audio } from '../../stores/story-store.js'

	$: sequence = story.sequences.find(seq => seq.slug.toLowerCase() === $page.params.sequence)
		|| story.sequences[0]

	$: seq_audio.set(
		sequence.audio_clips.reduce((result, clip) => {
			if (clip.audio_asset.mime_type.includes('audio')) {
				result[clip.id] = {}
				result[clip.id].intersecting = false
				result[clip.id].asset = clip.audio_asset
			}
			return result
		}, {})
	)
	// $: console.log(sequence.audio_clips)
	// $: console.log($seq_audio)
	// setTimeout(() => {
	// 	$seq_audio['ck9nl7aj17mdj0963zvkiq5b2'].intersecting = true
	// }, 5000)

	import ClipAudio from './media/ClipAudio.svelte'
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
	.audio {
		overflow: hidden;
		position: absolute;
		width: 0;
		height: 0;
	}
</style>
