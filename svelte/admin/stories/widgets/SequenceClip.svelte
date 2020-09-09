<div class="clip" class:open={$visible_bins[sequence.id].has(clip.id)} class:selected>

	<div class="header">
		{#if !selected}
			<!-- FIXME: make this a component -->
			<h2 on:click={() => toggle(clip.id)} title="{clip.slug} ({clip.order})">
				<span class="texts">
					{clip.slug}
					<span class="order">({clip.order})</span>
				</span>
				<span class="svg"><Caret/></span>
			</h2>
		{/if}
		<div class="button-wrap">
			<Button title="Delete" classes="alert blank" handler={() => handle_delete(index)}/>
			<!-- TODO: disable the `duplicate` button IF THE CLIP is being worked on / edited / not saved -->
			<Button title="Duplicate" classes="blank" handler={() => duplicate(index)}/>
			{#if selected}
				<Button
					title="Cancel"
					classes="warn"
					handler={() => $preview_clip = undefined}
				/>
			{:else}
				<Button
					title="Edit"
					classes="good"
					handler={() => $preview_clip = sequence.clips[index]}
				/>
			{/if}

		</div>
	</div>

	{#if selected}
		<SequenceForm {sequence} {clip}/>
	{/if}

	<AssetBins {sequence} {clip} selectedclip={selected}/>
</div>

<script>
	export let sequence
	export let clip
	export let index
	export let duplicate
	export let handle_delete

	import AssetBins from './AssetBins.svelte'
	import Button from '../../components/elements/Button.svelte'
	import SequenceForm from './SequenceForm.svelte'
	import Caret from '../../../svg/select-caret.svelte'

	import { preview_clip } from '../../../../stores/admin-store.js'
	import { visible_bins } from '../../../../stores/admin-store.js'

	$: selected = $preview_clip && $preview_clip.id === clip.id

	function toggle(id) {
		if ($visible_bins[sequence.id].has(id)) {
			$visible_bins[sequence.id].delete(id)
		} else {
			$visible_bins[sequence.id].add(id)
		}
		$visible_bins = $visible_bins
	}
</script>

<style type="text/scss">
	.clip {
		overflow: auto;
		margin: 0 0 40rem;
		padding: 20rem 20rem 0;
		background-color: var(--admin-accent-1);
		border-radius: 15rem;
		&:last-child { margin: 0; }
		&.open h2 .svg { transform: rotate(360deg); }
		&.selected {
			box-shadow: var(--admin-form-shadow);
			.header::before { content: ''; } // this forces the buttons to the right
		}
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 0 20rem;
	}
	h2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-width: 0;
		margin: 0 20rem 0 0;
		font: bold 14rem/1 var(--admin-font);
		cursor: pointer;
		user-select: none;
		.texts {
			overflow: hidden;
			margin: 0 5rem 0 0;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.order {
			font: 12rem/1.2 var(--admin-font);
			white-space: nowrap;
			opacity: 0.5;
		}
		.svg {
			width: 12rem;
			height: 6rem;
			transform: rotate(270deg);
			line-height: 0;
		}
	}
	.button-wrap {
		display: flex;
		justify-content: flex-end;
		margin: 0;
		:global(.button) {
			margin: 0 0 0 15rem;
			&:first-child { margin: 0; }
		}
	}
</style>
