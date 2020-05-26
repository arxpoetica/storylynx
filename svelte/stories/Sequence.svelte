<div class="the-stack">
	{#each sequence.clips as clip}
		<div bind:this={$stack[clip.id]} class="stack"></div>
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
		<Clip {clip}/>
	{/each}
</div>

<script>
	export let sequence

	import { stack, seq_audio, view_height } from '../../stores/story-store.js'

	import ClipAudio from './media/ClipAudio.svelte'
	import Clip from './Clip.svelte'

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
			Object.keys($stack).forEach((key, index) => {
				if (index === 0) {
					const parent = $stack[key].parentElement
					parent.style.width = '20rem'
					parent.style.backgroundColor = 'red'
					parent.style.zIndex = '30000000000000000'
				}
				$stack[key].style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
			})
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
	}
</style>
