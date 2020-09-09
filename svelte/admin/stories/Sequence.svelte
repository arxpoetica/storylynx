<Scaffolding title="Stories" fullwidth={true}>
	<div class="dash">
		<div class="toolbar">
			<h2>Story: <a href="/admin/stories">{sequence.story.title}</a> / {sequence.slug}</h2>
		</div>
		<div class="wrap">
			<div class="panes">
				<div class="pane developer">
					<SequenceEditor {sequence}/>
				</div>
				<div class="pane sequence">
					<PreviewPane {sequence}/>
				</div>
			</div>
		</div>
	</div>
</Scaffolding>

<script>
	export let sequence = {}

	// passing variables to the template wrapper of the layout theme
	import { templates, theme_elements, template_transitions, html_templates, html_colors }
		from '../../../stores/admin-store.js'
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
	import SequenceEditor from './widgets/SequenceEditor.svelte'
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
		grid-template-columns: 1fr 1fr;
	}
	.pane {
		position: relative;
		overflow: auto;
		// padding: 20rem;
		@mixin scrollbar {}
	}
	.developer {
		padding: 40rem;
	}
	.sequence {
		border-left: 1px solid var(--admin-accent-2);
	}
</style>
