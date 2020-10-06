{#if asset.mime_type.includes('image')}
	<div class="img" style="background-image:url({src(asset.handle)});"></div>
{:else if asset.mime_type.includes('video')}
	<div class="svg"><VideoIcon/></div>
{:else if asset.mime_type.includes('audio')}
	<div class="svg"><AudioIcon/></div>
{:else if asset.mime_type.includes('html')}
	<div class="svg"><HtmlIcon/></div>
{:else}
	<div class="svg"><UnknownIcon/></div>
{/if}


<script>
	export let asset

	import { src } from './asset-helpers.js'

	import VideoIcon from '../../../svg/asset-icon-video.svelte'
	import AudioIcon from '../../../svg/asset-icon-audio.svelte'
	import HtmlIcon from '../../../svg/asset-icon-html.svelte'
	import UnknownIcon from '../../../svg/asset-icon-unknown.svelte'
</script>

<style type="text/scss">
	.img {
		position: relative;
		width: 100%;
		padding: 0 0 100%;
		background: none no-repeat center transparent;
		background-size: cover;
	}
	.svg {
		width: 22rem;
		height: 22rem;
	}
</style>
