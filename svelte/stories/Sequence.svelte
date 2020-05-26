<div bind:this={the_stack} class="the-stack">
	{#each sequence.clips as clip, index}
		<div bind:this={clip.stack} class="{clip.url_hash} stack"></div>
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

<script>
	export let sequence

	import { seq_audio, view_height } from '../../stores/story-store.js'

	let the_stack

	import ClipAudio from './media/ClipAudio.svelte'
	import Clip from './Clip.svelte'

	import { hyphenate } from '../../utils/basic-utils.js'
	function url_hash(clip) {
		return clip.slug ? `nav-${hyphenate(clip.slug.toLowerCase())}` : `nav-${clip.id}`
	}

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

	// <!-- FUN STUFF!! REVERSE Z-INDEX STACKING ORDER!! -->
	import { onMount, onDestroy } from 'svelte'
	let style
	onMount(() => {
		style = document.createElement('style')
		style.innerText = sequence.clips.map((clip, index) => {
			return `#${clip.url_hash}{z-index:${9999 - index};}`
		}).join('')
		document.head.appendChild(style)

		// DEVELOPER HELPER ONLY
		if (process.env.NODE_ENV === 'development') {
			the_stack.style.width = '20rem'
			the_stack.style.height = 'auto'
			the_stack.style.backgroundColor = 'red'
			the_stack.style.zIndex = '30000000000000000'
			for (let clip of sequence.clips) {
				if (clip.stack) {
					clip.stack.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
				}
			}
		}
	})
	onDestroy(() => {
		if (style) {
			style.remove()
		}
	})
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
