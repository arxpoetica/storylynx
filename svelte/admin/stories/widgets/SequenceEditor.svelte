{#each sequence.clips as clip, index}
	<div class="clip" class:on={index === selected_index}>
		<div class="header">
			<h2>{clip.slug}</h2>
			<div class="button-wrap">
				<Button title="Edit" handler={() => select(index)}/>
			</div>
		</div>
		<div class="content">
			<!-- <p>{JSON.stringify(Object.keys(clip))}</p> -->
			<!-- <p>id: {JSON.stringify(clip.id)}</p> -->
			<!-- <p>slug: {JSON.stringify(clip.slug)}</p> -->
			<!-- <p>hide_navigation: {JSON.stringify(clip.hide_navigation)}</p> -->
			<!-- <p>order: {JSON.stringify(clip.order)}</p> -->
			<!-- <p>template: {JSON.stringify(clip.template)}</p> -->
			<!-- <p>theme_elements: {JSON.stringify(clip.theme_elements)}</p> -->
			<!-- <p>transition: {JSON.stringify(clip.transition)}</p> -->
			<AssetBins bins={clip.asset_bins} selectedclip={index === selected_index}/>
		</div>
	</div>
{/each}

<script>
	export let sequence
	let selected_index

	import { preview_clip } from '../../../../stores/admin-store.js'

	import AssetBins from './AssetBins.svelte'
	import Button from '../../components/elements/Button.svelte'


	function select(index) {
		selected_index = index
		$preview_clip = sequence.clips[index]
	}
</script>

<style type="text/scss">
	.clip {
		margin: 0 0 40rem;
		padding: 20rem;
		background-color: var(--admin-accent-1);
		border-radius: 15rem;
		&:last-child { margin: 0; }
		&:hover .button-wrap { opacity: 1; }
		&.on .button-wrap { display: none; }
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;
	}
	h2 {
		margin: 0 0 20rem;
		font: bold 15rem var(--admin-font);
	}
	// .content {
	// }
	.button-wrap {
		opacity: 0;
	}
</style>
