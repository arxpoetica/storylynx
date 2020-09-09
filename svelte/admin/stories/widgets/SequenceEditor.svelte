<SequenceTools {sequence}/>
{#each sequence.clips as clip, index (clip.id)}
	<SequenceClip bind:sequence {clip} {index} {duplicate} {handle_delete}/>
{/each}
{#if duplicate_open}
	<ModalDuplicateClip bind:sequence clip={duplicate_clip} bind:open={duplicate_open}/>
{/if}
{#if delete_open}
	<ModalDeleteClip bind:sequence clip={delete_clip} bind:open={delete_open}/>
{/if}

<script>
	export let sequence

	import SequenceTools from './SequenceTools.svelte'
	import SequenceClip from './SequenceClip.svelte'
	import ModalDuplicateClip from './ModalDuplicateClip.svelte'
	import ModalDeleteClip from './ModalDeleteClip.svelte'

	import { visible_bins } from '../../../../stores/admin-store.js'
	if (!$visible_bins[sequence.id]) { $visible_bins[sequence.id] = new Set() }

	let duplicate_clip
	let duplicate_open = false
	async function duplicate(index) {
		duplicate_clip = sequence.clips[index]
		duplicate_open = true
	}

	let delete_clip
	let delete_open = false
	async function handle_delete(index) {
		delete_clip = sequence.clips[index]
		delete_open = true
	}
</script>

<!-- <style type="text/scss"></style> -->
