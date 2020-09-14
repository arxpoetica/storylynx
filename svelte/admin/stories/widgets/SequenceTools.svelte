<div class="tools" class:expanded>
	<h2>{$seq.slug}</h2>
	<Button classes="small blank" handler={toggle_all}>
		<span class="text">{expanded ? 'Collapse' : 'Expand'} All</span>
		<span class="svg"><Caret/></span>
	</Button>
</div>

<script>
	import { seq, visible_bins } from '../../../../stores/admin-store.js'
	$: expanded = $seq && $visible_bins[$seq.id].size

	import Button from '../../components/elements/Button.svelte'
	import Caret from '../../../svg/select-caret.svelte'

	function toggle_all() {
		$seq.clips.map(clip => $visible_bins[$seq.id][expanded ? 'delete' : 'add'](clip.id))
		$visible_bins = $visible_bins
	}
</script>

<style type="text/scss">
	.tools {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 0 40rem;
		padding: 12rem 15rem;
		background-color: var(--admin-accent-0);
		border-radius: 2rem;
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
