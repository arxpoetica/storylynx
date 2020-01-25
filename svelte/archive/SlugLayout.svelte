<div class="layout-main">
	<div class="pre-texts">
		<h1>
			{asset_group.title}
			{#if asset_group.year}
				<span>({asset_group.year})</span>
			{/if}
		</h1>
		<h2 class="h6">Archive | {asset_group.content_type || 'Uncategorized'}</h2>
	</div>
	<slot name="pre-content"></slot>
	<div class:many class="assets-group" on:contextmenu={event => event.preventDefault()}>
		{#if asset_group.assets.length > 1}
			<div class="thumbs">
				{#each asset_group.assets as thumb, index}
					<div class="thumb" on:mouseover={() => selected = index} on:click={show_zoom}>
						<Asset asset={thumb} thumb={true}/>
					</div>
				{/each}
			</div>
		{/if}
		<div class:video class="media" on:click={show_zoom}>
			<Asset asset={main_asset} magnifier={true}/>
		</div>
	</div>
	<div class="post-texts">
		<div class="detail">
			{@html html}
		</div>
		{#if asset_group.source}
			<h3 class="source h6">Source: {asset_group.source}</h3>
		{/if}
		<Tags url="/archive" {tags}/>
	</div>
	<slot name="post-content"></slot>
</div>
{#if main_asset.url}
	<Zoom bind:zoomshow src={main_asset.url} alt={alt(main_asset)} width={main_asset.width} height={main_asset.height}/>
{/if}

<script>
	export let asset_group

	import { src, alt } from '../../utils/basic-utils'
	import Asset from '../Asset.svelte'
	import Zoom from './Zoom.svelte'
	let zoomshow = false

	$: many = asset_group.assets.length > 1
	let selected = 0
	$: main_asset = asset_group.assets[selected]
	$: video = main_asset.mime_type.split('/')[0] === 'video'

	const show_zoom = () => zoomshow = !video

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	$: html = asset_group.html ? asset_group.html.replace(/<p><\/p>/gi, '') : ''

	import Tags from '../Tags.svelte'
	$: decade = asset_group.year ? Math.floor(asset_group.year / 10) * 10 : undefined
	$: tags = asset_group.tags
		.concat(decade ? [`${decade}s`] : [])
		.concat(asset_group.content_type ? asset_group.content_type : [])
		.concat(asset_group.subject ? asset_group.subject : [])
</script>

<style type="text/scss">
	.pre-texts {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		text-align: center;
		max-width: 900rem;
		margin: 0 auto;
	}
	h1 {
		margin: 0 0 40rem;
		span { display: block; }
	}
	h2 {
		margin: 0 0 12rem;
	}
	.assets-group {
		max-width: 720rem;
		margin: 0 auto 100rem;
	}
	.many {
		position: relative;
		padding-left: 110rem;
		max-width: 830rem;
		.thumbs {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			max-width: 100rem;
			overflow-y: auto;
		}
		.thumb {
			margin: 0 0 10rem;
			cursor: zoom-in;
			&:last-child { margin: 0; }
		}
	}
	.media {
		cursor: zoom-in;
		&.video {
			cursor: default;
		}
	}
	.post-texts {
		max-width: 500rem;
		margin: 0 auto 100rem;
	}
	.detail {
		margin: 0 0 20rem;
	}
	.source {
		margin: 0 0 35rem;
	}
</style>
