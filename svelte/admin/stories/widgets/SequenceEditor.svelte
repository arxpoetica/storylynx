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
			<p>id: {JSON.stringify(clip.id)}</p>
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
		// position: relative;
		border-bottom: 1rem solid var(--admin-gray-light);
		&:last-child {
			border: 0;
		}
		&:hover {
			background-color: var(--admin-gray-lighter);
			.header { background-color: rgba(244, 246, 246, 0.9); }
			.button-wrap { opacity: 1; }
		}
		&.on {
			background-color: var(--admin-blue-faint);
			.header { background-color: rgba(231, 246, 254, 0.9); }
			.button-wrap { display: none; }
		}
	}
	.header {
		position: sticky;
		top: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rem;
		background-color: rgba(255, 255, 255, 0.9);
		z-index: 2;
	}
	.content {
		padding: 20rem;
	}
	.button-wrap {
		opacity: 0;
	}
</style>
