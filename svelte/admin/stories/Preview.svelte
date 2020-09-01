<svelte:window bind:innerHeight={$view_height}/>

<!-- FIXME: break up some of these parts into shared components -->
<div class="story-layout" bind:this={layout}>
	{#if $i_sequence}
		<div bind:this={the_stack} class="the-stack">
			{@html style_tag}
			<!-- SEE: https://github.com/sveltejs/svelte/issues/4317 -->
			<!-- ALSO: https://discordapp.com/channels/457912077277855764/571775594002513921/749445541724815360 -->
			{#each $i_sequence.clips as { id, slug }, index}
				<!-- <div style="display:none;">{console.log(index, id, $seq_stack)}</div> -->
				<div bind:this={$seq_stack[id]} class="{url_hash({ id, slug })} stack"></div>
			{/each}
		</div>
		<div class="audio">
			{#each $i_sequence.audio_clips as audio_clip}
				{#if $seq_audio[audio_clip.id]}
					<ClipAudio intersecting={$seq_audio[audio_clip.id].intersecting} asset={audio_clip.audio_asset}/>
				{/if}
			{/each}
		</div>
		<div class="sequence {$i_sequence.classes ? $i_sequence.classes : ''}">
			{#each $i_sequence.clips as clip}
				<Clip {clip}/>
			{/each}
		</div>
	{/if}
</div>

<script>
	let the_stack

	import { seq_audio, seq_stack, view_height } from '../../../stores/story-store.js'
	import { i_sequence, i_clip_id } from '../../../stores/admin-store.js'
	import { url_hash } from '../../../utils/story-utils.js'
	import ClipAudio from '../../stories/media/ClipAudio.svelte'
	import Clip from '../../stories/Clip.svelte'

	$: if (process.browser) {
		window.i_sequence = i_sequence
		window.i_clip_id = i_clip_id
	}

	let style_tag = ''
	$: if ($i_sequence) {
		style_tag = '<' + 'style' + '>'
		style_tag += $i_sequence.clips.map((clip, index) => `#${url_hash(clip)}{z-index:${9999 - index};}`).join('')
		style_tag += '<' + '/style' + '>'

		seq_audio.set(
			$i_sequence.audio_clips.reduce((result, clip) => {
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

	let layout, html, mutation_observer, resize_observer
	import { onMount, onDestroy } from 'svelte'
	onMount(() => {
		html = document.querySelector('html')
		mutation_observer = new MutationObserver(() => jump())
		mutation_observer.observe(layout, { childList: true, subtree: true })
		resize_observer = new ResizeObserver(() => jump())
		resize_observer.observe(layout)
	})
	onDestroy(() => {
		if (mutation_observer) { mutation_observer.disconnect() }
		if (resize_observer) { resize_observer.disconnect() }
	})

	function jump() {
		if ($seq_stack[$i_clip_id]) {
			setTimeout(() => html.scrollTop = $seq_stack[$i_clip_id].offsetTop, 0)
		} else {
			html.scrollTop = 0 // weird edge cases
		}
	}
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
