{#if asset}
	<div class="asset">
		{#if type === 'video'}
			<!-- <InlineVideo {asset} {image} {options}/> -->
			<InlineVideo {asset}/>
		{:else if type === 'audio'}
			<InlineAudio {asset} {image} {options}/>
		{:else if type === 'text'}
			<!-- <InlineText {asset} {options}/> -->
			<InlineText {asset}/>
		{:else}
			<InlineImage {asset} {options}/>
		{/if}
	</div>
{/if}

<script>
	export let assets = []
	export let options = {}

	import InlineVideo from './InlineVideo.svelte'
	import InlineAudio from './InlineAudio.svelte'
	import InlineText from './InlineText.svelte'
	import InlineImage from './InlineImage.svelte'

	$: videos = assets.filter(asset => asset.mime_type.includes('video'))
	$: audios = assets.filter(asset => asset.mime_type.includes('audio'))
	$: texts = assets.filter(asset => asset.mime_type.includes('text'))
	$: images = assets.filter(asset => asset.mime_type.includes('image'))

	let asset
	$: if (videos.length) { asset = videos[0] }
	else if (audios.length) { asset = audios[0] }
	else if (texts.length) { asset = texts[0] }
	else if (images.length) { asset = images[0] }
	else { asset = undefined }

	$: type = asset && asset.mime_type ? asset.mime_type.split('/')[0] : undefined

	$: image
		= (type === 'video' || type === 'audio') && images.length
		? images[0]
		: undefined
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
