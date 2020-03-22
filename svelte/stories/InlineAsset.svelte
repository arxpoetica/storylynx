{#if asset}
	<div class="asset">
		{#if type === 'video'}
			<!-- <InlineVideo {asset} {options}/> -->
			<InlineVideo {asset}/>
		{:else if type === 'audio'}
			InlineAudio asset options
		{:else}
			<InlineImage {asset} {options}/>
		{/if}
	</div>
{/if}

<script>
	export let assets = []
	export let options = {}

	import InlineVideo from './InlineVideo.svelte'
	// import InlineAudio from './InlineAudio.svelte'
	import InlineImage from './InlineImage.svelte'

	$: videos = assets.filter(asset => asset.mime_type.includes('video'))
	$: audios = assets.filter(asset => asset.mime_type.includes('audio'))
	$: images = assets.filter(asset => asset.mime_type.includes('image'))
	$: asset = videos.length ? videos[0] : (
		audios.length ? audios[0] : (
			images.length ? images[0] : undefined
		)
	)
	$: type = asset ? asset.mime_type.split('/')[0] : undefined

	$: asset_two
		= (type === 'video' || type === 'audio') && images.length
		? images[0]
		: undefined
	// $: type_two = asset_two ? asset_two.mime_type.split('/')[0] : undefined
</script>

<style type="text/scss">
	.asset {
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
	}
</style>
