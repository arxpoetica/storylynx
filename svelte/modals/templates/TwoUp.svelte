<!-- {#if clip.asset}
	<img src={clip.asset.url} alt={clip.summary || ''}/>
	{JSON.stringify(clip.asset)}
{/if} -->



<script>
	export let clip
	export let template
	export let theme
	export let html

	// import LazyImg from '../LazyImg.svelte'
	// $: asset = modal.assets ? modal.assets[0] : false
	// $: src = asset ? source(asset, { crop: true, height: Math.floor(asset.height / asset.width * 1000), width: 1000 }) : false
	// $: alt = asset ? asset.summary : 'No description for this image.'
</script>

<style type="text/scss">
</style>
