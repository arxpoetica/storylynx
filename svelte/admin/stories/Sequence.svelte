<div class="dash">
	<div class="tools">
		<h2>Sequence: {sequence.slug}</h2>
		<!-- Breadcrumb: -->
	</div>
	<div class="wrap">
		<div class="panes">
			<div class="pane developer">
			</div>
			<div class="pane sequence">
				{JSON.stringify(Object.keys(sequence))}
				<!-- {JSON.stringify(sequence)} -->
			</div>
		</div>
	</div>
</div>

<script>
	export let sequence = {}
	// import Button from '../components/elements/Button.svelte'
</script>

<style type="text/scss">
	.dash {
		display: grid;
		grid-template-rows: auto 1fr;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.tools {
		padding: 12rem 20rem;
		border-bottom: 1rem solid var(--admin-gray-light);
		background-color: var(--admin-gray-lighter);
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
		padding: 20rem;
	}
	// .developer-pane {}
	.sequence {
		border-left: 1px solid var(--admin-gray-light);
	}
</style>
