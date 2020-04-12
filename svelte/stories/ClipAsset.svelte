{#if asset}
	<div bind:this={elem} class="asset {transition}">
		<div class="asset-action" style={animation_style}>
			{#if type === 'video'}
				<!-- <ClipVideo {asset} {image} {options}/> -->
				<ClipVideo {intersecting} {asset}/>
			{:else if type === 'audio'}
				<ClipAudio {intersecting} {asset} {image} {options}/>
			{:else if type === 'image'}
				<ClipImage {intersecting} {asset} {text} {options}/>
			{:else}
				<!-- <ClipText {asset} {options}/> -->
				<ClipText {intersecting} {asset}/>
			{/if}
		</div>
	</div>
{/if}

<script>
	export let index = 0
	export let clip
	export let intersecting = false
	export let options = {}
	export let overrides = []

	import { camel_to_hyphen } from '../../utils/basic-utils.js'
	$: group = clip.asset_groups.length ? clip.asset_groups[index] : undefined
	$: assets = overrides.length && overrides || (group && group.assets.length ? group.assets : [])

	let elem
	import { animate_asset } from '../../utils/transition-utils.js'
	import { story_scroll } from '../../stores/app-store.js'
	$: transition = group && group.transition ? camel_to_hyphen(group.transition) : ''
	$: animation_style = group ? animate_asset(elem, group.transition, intersecting, $story_scroll) : ''

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
	.asset-action {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
