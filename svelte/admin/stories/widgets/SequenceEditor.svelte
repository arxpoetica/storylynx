{#each sequence.clips as clip, index}
	<div class="clip">
		<h2>{clip.slug} <span>({clip.order})</span></h2>
		<div class="content">
			<AssetBins bins={clip.asset_bins} selectedclip={index === selected_index}/>
		</div>
		<div class="button-wrap">
			<Button title="Delete" classes="alert blank" handler={() => handle_delete(index)}/>
			<!-- TODO: disable the `duplicate` button IF THE CLIP is being worked on / edited / not saved -->
			<!-- disabled={index === selected_index ? 'disabled' : undefined} -->
			<Button
				title="Duplicate"
				classes="blank"
				handler={() => duplicate(index)}
			/>
			<Button
				title="Edit"
				classes="good"
				disabled={index === selected_index ? 'disabled' : undefined}
				handler={() => select(index)}
			/>
		</div>
	</div>
{/each}
{#if duplicate_open}
	<ModalDuplicateClip bind:sequence clip={duplicate_clip} bind:open={duplicate_open}/>
{/if}
{#if delete_open}
	<ModalDeleteClip bind:sequence clip={delete_clip} bind:open={delete_open}/>
{/if}

<script>
	export let sequence
	let selected_index

	import { preview_clip } from '../../../../stores/admin-store.js'

	import AssetBins from './AssetBins.svelte'
	import Button from '../../components/elements/Button.svelte'
	import ModalDuplicateClip from './ModalDuplicateClip.svelte'
	import ModalDeleteClip from './ModalDeleteClip.svelte'

	function select(index) {
		selected_index = index
		$preview_clip = sequence.clips[index]
	}

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

<style type="text/scss">
	.clip {
		margin: 0 0 40rem;
		padding: 20rem;
		background-color: var(--admin-accent-1);
		border-radius: 15rem;
		&:last-child { margin: 0; }
	}
	h2 {
		margin: 0 0 20rem;
		font: bold 15rem/1.2 var(--admin-font);
		span {
			font: 12rem/1.2 var(--admin-font);
			white-space: nowrap;
			opacity: 0.5;
		}
	}
	.button-wrap {
		display: flex;
		justify-content: flex-end;
		:global(.button) {
			margin: 0 0 0 15rem;
			&:first-child { margin: 0; }
		}
	}
</style>
