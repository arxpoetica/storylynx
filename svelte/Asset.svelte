<!-- <p>{JSON.stringify(asset)}</p> -->
<!-- <p>{console.log(asset)}</p> -->
<!-- FIXME: what about the case where there is no thumb for a video??? -->

{#if asset.mime_type.indexOf('image') === 0}
	{#if magnifier}
		<Magnifier src={asset.url} alt={alt(asset)} {width} {height} {loaded}>
			<LazyImg src={asset.url} alt={alt(asset)} {width} {height} bind:loaded/>
		</Magnifier>
	{:else}
		<LazyImg src={src(asset, { crop: true })} alt={alt(asset)} {width} {height}/>
	{/if}
{:else if asset.mime_type.indexOf('video') === 0}
	{#if thumb}
		<LazyImg src={src(asset.cover, { crop: true })} alt={alt(asset.caption)}/>
	{:else}
		<LazyVid src={asset.url} alt={alt(asset.caption)}/>
	{/if}
{/if}

<script>
	import { src, alt } from '../utils/basic-utils'
	import LazyImg from './LazyImg.svelte'
	import LazyVid from './LazyVid.svelte'
	import Magnifier from './Magnifier.svelte'

	let loaded = false
	export let asset
	export let thumb = false
	export let magnifier = false

	$: width = thumb ? 100 : asset.width
	$: height = thumb ? 100 : asset.height
</script>

<!-- <style type="text/scss"></style> -->
