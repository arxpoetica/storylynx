<svelte:window bind:innerHeight={$view_height}/>

<!-- FIXME: break up some of these parts into shared components -->
<div class="story-layout" bind:this={layout}>
	{#if sequence}
		<div bind:this={the_stack} class="the-stack">
			{@html style_tag}
			<!-- SEE: https://github.com/sveltejs/svelte/issues/4317 -->
			<!-- ALSO: https://discordapp.com/channels/457912077277855764/571775594002513921/749445541724815360 -->
			{#each sequence.clips as { id, slug }, index}
				<!-- <div style="display:none;">{console.log(index, id, $seq_stack)}</div> -->
				<div bind:this={$seq_stack[id]} class="{url_hash({ id, slug })} stack"></div>
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
			{#each sequence.clips as seq_clip}
				{#if seq_clip.id === clip.id}
					<Clip clip={prep_clip_for_preview(clip)}/>
				{:else}
					<Clip clip={seq_clip}/>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<script>
	let the_stack
	let sequence
	let clip

	import { seq_audio, seq_stack, view_height } from '../../../stores/story-store.js'
	import { url_hash, prep_clip_for_preview } from '../../../utils/story-utils.js'
	import ClipAudio from '../../stories/media/ClipAudio.svelte'
	import Clip from '../../stories/Clip.svelte'

	let style_tag = ''
	$: if (sequence) {
		style_tag = '<' + 'style' + '>'
		style_tag += sequence.clips.map((clip, index) => `#${url_hash(clip)}{z-index:${9999 - index};}`).join('')
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

	let layout, html, mutation_observer, resize_observer
	import { onMount, onDestroy } from 'svelte'
	onMount(() => {
		window.addEventListener('message', receiveMessage)
		html = document.querySelector('html')
		mutation_observer = new MutationObserver(() => jump())
		mutation_observer.observe(layout, { childList: true, subtree: true })
		resize_observer = new ResizeObserver(() => jump())
		resize_observer.observe(layout)
	})
	onDestroy(() => {
		if (process.browser) { window.removeEventListener('message', receiveMessage) }
		if (mutation_observer) { mutation_observer.disconnect() }
		if (resize_observer) { resize_observer.disconnect() }
	})

	function receiveMessage(event) {
		if (event.data.clip) { clip = event.data.clip }
		if (event.data.sequence) { sequence = event.data.sequence }
	}

	function jump() {
		if (clip && $seq_stack[clip.id]) {
			setTimeout(() => html.scrollTop = $seq_stack[clip.id].offsetTop, 0)
		} else {
			html.scrollTop = 0 // weird edge cases
		}
	}
</script>

<style type="text/scss">
	:global(.admin-preview-section body) {
		&::-webkit-scrollbar { width: 12rem;}
		&::-webkit-scrollbar-track {
			background-color: #4a5a64;
		}
		&::-webkit-scrollbar-thumb {
			background-color: #74858d;
			border-left: 1rem solid #4a5a64;
			border-radius: 12rem;
		}
	}
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
