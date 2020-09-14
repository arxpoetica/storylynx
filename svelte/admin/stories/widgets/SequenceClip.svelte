<div class="clip" class:open={$visible_bins[$seq.id].has(clip.id)} class:selected class:saveable>
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
		<SequenceActions {index} {selected} {saveable} bind:preview_string/>
	</div>
	{#if selected}
		<SequenceForm/>
	{/if}
	<AssetBins {clip} selectedclip={selected}/>
</div>

<script>
	export let clip
	export let index

	import SequenceActions from './SequenceActions.svelte'
	import AssetBins from './AssetBins.svelte'
	import SequenceForm from './SequenceForm.svelte'
	import Caret from '../../../svg/select-caret.svelte'

	import { seq, preview_clip, messenger, visible_bins/* , saveable */ } from '../../../../stores/admin-store.js'
	$: selected = $preview_clip && $preview_clip.id === clip.id
	$: clip_string = selected && JSON.stringify(clip)
	$: preview_string = selected && JSON.stringify($preview_clip)
	$: saveable = selected && clip_string !== preview_string
	$: if (preview_string) {
		$messenger({ clip: $preview_clip })
	}

	function toggle(id) {
		if ($visible_bins[$seq.id].has(id)) {
			$visible_bins[$seq.id].delete(id)
		} else {
			$visible_bins[$seq.id].add(id)
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
		&.saveable { box-shadow: 0 0 0 3rem var(--admin-warn); }
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
</style>
