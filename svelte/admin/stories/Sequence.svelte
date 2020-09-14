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
						{#each $seq.clips as clip, index (clip.id)}
							<SequenceClip {clip} {index}/>
						{/each}
					</div>
					<div class="pane sequence">
						<PreviewPane/>
					</div>
				</div>
			</div>
		</div>
	</Scaffolding>
{/if}

<script>
	import {
		seq,
		visible_bins,
		templates,
		theme_elements,
		template_transitions,
		html_templates,
		html_colors
	} from '../../../stores/admin-store.js'

	export let sequence
	$: setTimeout(() => $seq = sequence, 0)
	$: if ($seq && !$visible_bins[$seq.id]) { $visible_bins[$seq.id] = new Set(); }

	// passing variables to the template wrapper of the layout theme
	export let enum_templates = []
	export let enum_theme_elements = []
	export let enum_template_transitions = []
	export let enum_html_templates = []
	export let enum_html_colors = []
	$: $templates = enum_templates
	$: $theme_elements = enum_theme_elements
	$: $template_transitions = enum_template_transitions
	$: $html_templates = enum_html_templates
	$: $html_colors = enum_html_colors

	import Scaffolding from '../components/layout/Scaffolding.svelte'
	import SequenceTools from './widgets/SequenceTools.svelte'
	import SequenceClip from './widgets/SequenceClip.svelte'
	import PreviewPane from './widgets/PreviewPane.svelte'
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
		grid-template-columns: auto 1fr;
	}
	.pane {
		position: relative;
		overflow: auto;
		// padding: 20rem;
		@mixin scrollbar {}
	}
	.developer {
		max-width: 772rem;
		padding: 40rem;
	}
	.sequence {
		border-left: 1px solid var(--admin-accent-2);
	}
</style>
