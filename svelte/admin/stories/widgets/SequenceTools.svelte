<div class="tools">
	<div class="header" class:expanded>
		<h2>{$seq.slug}</h2>
		<Button classes="small blank" handler={toggle_all}>
			<span class="text">{expanded ? 'Collapse' : 'Expand'} All</span>
			<span class="svg"><Caret/></span>
		</Button>
	</div>
	<Buttons>
		<Button label="Upload Assets" classes="blank plus" handler={() => $handlers.upload_assets()}/>
	</Buttons>
	<Buttons classes="align-right">
		<Button label="New Clip" classes="blank good plus" handler={() => $handlers.create_clip()}/>
	</Buttons>
</div>

<script>
	import { seq, visible_bins, handlers } from '../../../../stores/admin-store.js'
	$: expanded = $seq && $visible_bins[$seq.id].size

	import Buttons from '../../components/elements/Buttons.svelte'
	import Button from '../../components/elements/Button.svelte'
	import Caret from '../../../svg/select-caret.svelte'
	function toggle_all() {
		$visible_bins[$seq.id] = new Set(expanded ? [] : $seq.clips.map(clip => clip.id))
	}
</script>

<style type="text/scss">
	.tools {
		display: flex;
		flex-direction: column;
		:global(> .buttons) { order: 1; }
		:global(> .buttons:last-child) { order: 3; }
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		order: 2;
		margin: 0 0 20rem;
		padding: 12rem 15rem;
		background-color: var(--admin-accent-0);
		border-radius: 12rem;
		&.expanded .svg { transform: rotate(360deg); }
	}
	h2 {
		margin: 0 12rem 0 0;
	}
	.text {
		font: 13rem/1.2 var(--admin-font);
		color: var(--admin-text);
	}
	.svg {
		width: 12rem;
		height: 6rem;
		margin: 0 0 0 6rem;
		color: var(--admin-text);
		line-height: 0;
		transform: rotate(270deg);
	}
</style>
