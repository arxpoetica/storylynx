<SequenceTools {sequence}/>
{#each sequence.clips as clip, index}
	<div class="clip" class:open={$visible_bins.has(clip.id)} class:selected={index === selected_index}>
		<!-- FIXME: make this a component -->
		<h2 on:click={() => toggle(clip.id)}>
			<span class="texts">
				{clip.slug}
				<span class="order">({clip.order})</span>
			</span>
			<span class="svg"><Caret/></span>
		</h2>
		<AssetBins {sequence} {clip} selectedclip={index === selected_index}/>
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

	import SequenceTools from './SequenceTools.svelte'
	import AssetBins from './AssetBins.svelte'
	import Button from '../../components/elements/Button.svelte'
	import ModalDuplicateClip from './ModalDuplicateClip.svelte'
	import ModalDeleteClip from './ModalDeleteClip.svelte'
	import Caret from '../../../svg/select-caret.svelte'

	import { visible_bins } from '../../../../stores/admin-store.js'
	function toggle(id) {
		if ($visible_bins.has(id)) {
			$visible_bins.delete(id)
		} else {
			$visible_bins.add(id)
		}
		$visible_bins = $visible_bins
	}

	import { preview_clip } from '../../../../stores/admin-store.js'
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
		&.open h2 .svg { transform: rotate(360deg); }
		&.selected {
			box-shadow: var(--admin-form-shadow);
			h2 {
				pointer-events: none;
				.texts { margin: 0; }
				.svg { display: none; }
			}
		}
	}
	h2 {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin: 0 0 20rem;
		font: bold 15rem/1.2 var(--admin-font);
		cursor: pointer;
		user-select: none;
		.texts {
			margin: 0 15rem 0 0;
		}
		.order {
			font: 12rem/1.2 var(--admin-font);
			white-space: nowrap;
			opacity: 0.5;
		}
		.svg {
			width: 12rem;
			height: 6rem;
			margin: 7rem 0 0;
			transform: rotate(270deg);
			line-height: 0;
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
