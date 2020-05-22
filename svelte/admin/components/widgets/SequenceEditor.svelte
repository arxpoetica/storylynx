{#each sequence.clips as clip}
	<div class="clip">
		<h2>{clip.slug}</h2>
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
	import AssetBins from './AssetBins.svelte'
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
