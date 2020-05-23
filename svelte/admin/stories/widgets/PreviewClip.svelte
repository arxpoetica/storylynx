<div class="clip">
	{#if $clip}
		<h2>{$clip.slug}</h2>
		<!-- <p>{JSON.stringify(Object.keys($clip))}</p> -->
		<!-- <p>id: {JSON.stringify($clip.id)}</p> -->
		<!-- <p>slug: {JSON.stringify($clip.slug)}</p> -->
		<!-- <p>hide_navigation: {JSON.stringify($clip.hide_navigation)}</p> -->
		<!-- <p>order: {JSON.stringify($clip.order)}</p> -->
		<!-- <p>template: {JSON.stringify($clip.template)}</p> -->
		<!-- <p>theme_elements: {JSON.stringify($clip.theme_elements)}</p> -->
		<!-- <p>transition: {JSON.stringify($clip.transition)}</p> -->
		<!-- <p>asset_bins: {JSON.stringify($clip.asset_bins)}</p> -->

		<PreviewAssetBins bins={$clip.asset_bins}/>

	{:else}
		<h2>Select a clip on the left to edit.</h2>
	{/if}
</div>

<script>
	import { preview_clip as clip } from '../../../../stores/admin-store.js'
	import PreviewAssetBins from './PreviewAssetBins.svelte'
</script>

<style type="text/scss">
	.clip {
		padding: 20rem;
		border-bottom: 1rem solid var(--admin-gray-light);
		&:last-child {
			border: 0;
		}
		// &:hover {
		// 	background-color: var(--admin-blue-faint);
		// }
	}
</style>
