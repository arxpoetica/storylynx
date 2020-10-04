{#if $seq}
	<Scaffolding title="Stories" fullwidth={true}>
		<div class="dash">
			<div class="toolbar">
				<h2>Story: <a href="/admin/stories">{$seq.story.title}</a> / {$seq.slug}</h2>
			</div>
			<div class="wrap">
				<div class="panes">
					<div class="pane developer">
						<SequenceTools/>
						<div class="clips">
							{#each $seq.clips as clip, index (clip.id)}
								<SequenceClip {clip} {index}/>
							{/each}
						</div>
					</div>
					<div class="pane sequence">
						<PreviewPane/>
					</div>
				</div>
			</div>
		</div>
	</Scaffolding>
	{#if new_clip}
		<ModalAddOrDuplicateClip clip={new_clip} bind:open={new_clip} type={new_clip_type}/>
	{/if}
	{#if delete_clip}
		<ModalDeleteClip clip={delete_clip} bind:open={delete_clip}/>
	{/if}
	{#if add_assets}
		<ModalAddAssets clip={add_assets} bind:open={add_assets}/>
	{/if}
{/if}

<script>
	import { seq, handlers, visible_bins, enums } from '../../../stores/admin-store.js'

	export let sequence
	$: setTimeout(() => $seq = sequence, 0)
	$: if ($seq && !$visible_bins[$seq.id]) { $visible_bins[$seq.id] = new Set() }

	// passing variables to the template wrapper of the layout theme
	export let sequence_enums
	$: $enums = sequence_enums

	import Scaffolding from '../components/layout/Scaffolding.svelte'
	import SequenceTools from './widgets/SequenceTools.svelte'
	import SequenceClip from './widgets/SequenceClip.svelte'
	import PreviewPane from './widgets/PreviewPane.svelte'
	import ModalAddOrDuplicateClip from './modals/ModalAddOrDuplicateClip.svelte'
	import ModalDeleteClip from './modals/ModalDeleteClip.svelte'
	import ModalAddAssets from './modals/ModalAddAssets.svelte'

	let new_clip
	let new_clip_type
	let delete_clip
	let add_assets
	$handlers = {
		create_clip: () => {
			new_clip_type = 'New'
			new_clip = { template: $enums.templates[0].id }
		},
		duplicate_clip: index => {
			new_clip_type = 'Duplicate'
			new_clip = $seq.clips[index]
		},
		delete_clip: index => delete_clip = $seq.clips[index],
		add_assets: () => {
			console.log('unsure what to do here yet, but putting in place')
		},
	}
</script>

<style type="text/scss">
	.dash {
		display: grid;
		grid-template-rows: auto 1fr;
		height: calc(100vh - 94rem);
		margin: 0 0 -40rem;
	}
	.toolbar {
		padding: 12rem 20rem;
		border-bottom: 1rem solid var(--admin-accent-2);
		background-color: var(--admin-accent-1);
		font: 12rem/1 (--admin-font);
		h2 {
			margin: 0;
			font: inherit;
		}
	}
	.wrap {
		position: relative;
	}
	.panes {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: grid;
		grid-template-columns: var(--admin-panel-width) auto;
	}
	.pane {
		position: relative;
		overflow: auto;
		// padding: 20rem;
		@mixin scrollbar {}
	}
	.developer {
		padding: 20rem;
	}
	.sequence {
		border-left: 1px solid var(--admin-accent-2);
	}
</style>
