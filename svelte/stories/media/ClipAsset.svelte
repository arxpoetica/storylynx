{#if asset}
	<!-- <div bind:this={elem} class="asset {transition}"> -->
		<!-- <div class="asset-action" style={animation_style}> -->
	{#if type === 'video'}
		<!-- <ClipVideo {asset} {image} {style}/> -->
		<ClipVideo bind:loaded {intersecting} {asset} {text} {style}/>
	{:else if type === 'audio'}
		<ClipAudio {intersecting} {asset} {text} {image} {style}/>
	{:else if type === 'image'}
		<ClipImage bind:loaded {intersecting} {asset} {text} {style}/>
	{:else}
		<!-- <ClipText {intersecting} {asset} {style}/> -->
		<ClipText {asset} {style}/>
	{/if}
{/if}

<script>
	export let index = 0
	export let clip
	export let intersecting = false
	export let style = ''
	export let overrides = []
	export let loaded = false

	$: group = clip.asset_bins.length ? clip.asset_bins[index] : undefined
	$: assets = overrides.length && overrides || (group && group.assets.length ? group.assets : [])

	import ClipVideo from './ClipVideo.svelte'
	import ClipAudio from './ClipAudio.svelte'
	import ClipImage from './ClipImage.svelte'
	import ClipText from './ClipText.svelte'

	$: videos = assets.filter(asset => asset.mime_type.includes('video'))
	$: audios = assets.filter(asset => asset.mime_type.includes('audio'))
	$: images = assets.filter(asset => asset.mime_type.includes('image'))
	$: texts = assets.filter(asset => asset.mime_type.includes('text'))

	let asset
	$: if (videos.length) { asset = videos[0] }
	else if (audios.length) { asset = audios[0] }
	else if (images.length) { asset = images[0] }
	else if (texts.length) { asset = texts[0] }
	else { asset = undefined }

	$: type = asset && asset.mime_type ? asset.mime_type.split('/')[0] : undefined

	$: image = (type === 'video' || type === 'audio') && images.length ? images[0] : undefined
	$: text = type !== 'text' && texts.length ? texts[0] : undefined
</script>

<!-- <style type="text/scss"></style> -->
