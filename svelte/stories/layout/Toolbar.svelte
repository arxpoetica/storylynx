<div class="toolbar">
	<div class="svg tool" on:click={() => $muted = !$muted}>
		{#if $muted}<AudioMuted/>{:else}<AudioAudible/>{/if}
	</div>
	<div class="svg tool" on:click={toggle_fullscreen}>
		{#if fullscreen}<FullscreenShut/>{:else}<FullscreenOpen/>{/if}
	</div>
</div>

<script>
	import { onMount } from 'svelte'
	import { muted } from '../../../stores/story-store.js'
	import AudioAudible from '../../svg/audio-audible.svelte'
	import AudioMuted from '../../svg/audio-muted.svelte'
	import FullscreenOpen from '../../svg/fullscreen-open.svelte'
	import FullscreenShut from '../../svg/fullscreen-shut.svelte'

	let fullscreen = false
	onMount(() => {
		document.addEventListener('fullscreenchange', event => {
			fullscreen = !!document.fullscreenElement
		})
	})
	function toggle_fullscreen() {
		fullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
		fullscreen = !fullscreen
	}
</script>

<style type="text/scss">
	.toolbar {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		pointer-events: all;
	}
	.tool {
		width: 34rem;
		height: 38rem;
		padding: 8rem 4rem;
		color: white;
		cursor: pointer;
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
		&:hover {
			opacity: 1;
		}
	}
</style>
