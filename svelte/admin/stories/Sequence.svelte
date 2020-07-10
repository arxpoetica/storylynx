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
					<!-- <p>{JSON.stringify(Object.keys(sequence))}</p> -->
					<!-- <p>{JSON.stringify(sequence.id)}</p> -->
					<!-- <p>{JSON.stringify(sequence.slug)}</p> -->
					<!-- <p>{JSON.stringify(sequence.order)}</p> -->
					<PreviewClip {sequence}/>
				</div>
			</div>
		</div>
	</div>
</Scaffolding>

<script>
	export let sequence = {}
	export let html_templates = []
	export let html_colors = []

	import { html_templates as templates, html_colors as colors } from '../../../stores/admin-store.js'
	$: $templates = html_templates.length ? html_templates : $templates
	$: $colors = html_colors.length ? html_colors : $colors

	import Scaffolding from '../components/layout/Scaffolding.svelte'
	import SequenceEditor from './widgets/SequenceEditor.svelte'
	import PreviewClip from './widgets/PreviewClip.svelte'
	// import Button from '../components/elements/Button.svelte'
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
		overflow: auto;
		// padding: 20rem;
	}
	// .developer-pane {}
	.sequence {
		border-left: 1px solid var(--admin-accent-2);
	}
</style>
