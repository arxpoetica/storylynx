<svelte:window bind:innerHeight={$view_height}/>

<!-- FIXME: break up some of these parts into shared components -->
{#if sequence}
	<div class="story-layout">
		<div bind:this={the_stack} class="the-stack">
			{@html style_tag}
			{#each sequence.clips as clip, index}
				<div bind:this={$seq_stack[clip.id]} class="{clip.url_hash} stack"></div>
			{/each}
		</div>
		<div class="audio">
			{#each sequence.audio_clips as audio_clip}
				{#if $seq_audio[audio_clip.id]}
					<ClipAudio intersecting={$seq_audio[audio_clip.id].intersecting} asset={audio_clip.audio_asset}/>
				{/if}
			{/each}
		</div>
		<div class="sequence {sequence.classes ? sequence.classes : ''}">
			{#each sequence.clips as clip}
				<Clip bind:clip/>
			{/each}
		</div>
	</div>
{/if}


<script>
	let the_stack

	import { seq_audio, seq_stack, view_height, preview } from '../../../stores/story-store.js'
	import { hyphenate } from '../../../utils/basic-utils.js'
	import ClipAudio from '../../stories/media/ClipAudio.svelte'
	import Clip from '../../stories/Clip.svelte'

	$: if (process.browser) { window.preview = preview }
	$: sequence = $preview

	let style_tag = ''
	$: if (sequence) {
		style_tag = '<' + 'style' + '>'
		style_tag += sequence.clips.map((clip, index) => `#${clip.url_hash}{z-index:${9999 - index};}`).join('')
		style_tag += '<' + '/style' + '>'

		seq_audio.set(
			sequence.audio_clips.reduce((result, clip) => {
				if (clip.audio_asset.mime_type.includes('audio')) {
					result[clip.id] = {}
					result[clip.id].intersecting = false
					result[clip.id].asset = clip.audio_asset
				}
				return result
			}, {})
		)
	}

	// <!-- FUN STUFF!! REVERSE Z-INDEX STACKING ORDER!! -->
	// the_stack.style.width = '20rem'
	// the_stack.style.height = 'auto'
	// the_stack.style.backgroundColor = 'red'
	// the_stack.style.zIndex = '30000000000000000'
	// for (let key in $seq_stack) {
	// 	const stack = $seq_stack[key]
	// 	if (stack) {
	// 		stack.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
	// 	}
	// }
</script>

<style type="text/scss">
	.story-layout {
		position: relative;
		z-index: 1;
	}
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

	// ================================================ >>>
	// ================================================ >>> THE STACK
	// ================================================ >>>

	// simple "stacking" elements, just to have something to hang onto
	// for scroll and transitions to work properly
	.the-stack {
		overflow: hidden;
		position: absolute;
		width: 0;
		height: auto;
	}
</style>