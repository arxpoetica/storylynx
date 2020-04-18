<div class="toolbar">
	<div class="svg tool muted-{$muted}" on:click={() => $muted = !$muted}>
		{#if $muted}<AudioMuted/>{:else}<AudioAudible/>{/if}
	</div>
</div>

<script>
	import { muted } from '../../stores/story-store.js'
	import AudioAudible from '../svg/audio-audible.svelte'
	import AudioMuted from '../svg/audio-muted.svelte'
</script>

<style type="text/scss">
	.toolbar {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		top: 0;
		right: 0;
		padding: 12rem 12rem 0 0;
		z-index: 999999999;
	}
	.tool {
		width: 38rem;
		height: 38rem;
		padding: 8rem;
		color: white;
		cursor: pointer;
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
		&:hover {
			opacity: 1;
		}
	}
	// .muted-false {}
</style>
