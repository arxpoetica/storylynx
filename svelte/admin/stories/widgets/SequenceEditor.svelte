{#each sequence.clips as clip, index}
	<div class="clip" class:on={index === selected_index}>
		<div class="header">
			<h2>{clip.slug}</h2>
			<div class="button-wrap">
				<Button title="Edit" handler={() => select(index)}/>
			</div>
		</div>
		<!-- <p>{JSON.stringify(Object.keys(clip))}</p> -->
		<p>id: {JSON.stringify(clip.id)}</p>
		<p>slug: {JSON.stringify(clip.slug)}</p>
		<p>hide_navigation: {JSON.stringify(clip.hide_navigation)}</p>
		<p>order: {JSON.stringify(clip.order)}</p>
		<p>template: {JSON.stringify(clip.template)}</p>
		<p>theme_elements: {JSON.stringify(clip.theme_elements)}</p>
		<p>transition: {JSON.stringify(clip.transition)}</p>
		<AssetBins bins={clip.asset_bins}/>
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
		padding: 20rem;
		border-bottom: 1rem solid var(--admin-gray-light);
		&:last-child {
			border: 0;
		}
		&:hover,
		&.on {
			background-color: var(--admin-blue-faint);
			.button-wrap { opacity: 1; }
		}
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.button-wrap {
		opacity: 0;
	}
</style>
