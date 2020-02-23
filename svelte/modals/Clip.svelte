<div class="clip template-{template} theme-{theme} clip-{clip.order} {clip.classes ? clip.classes : ''}">
	<div class="clip-wrap">
		{#if clip.asset}
			<img src={clip.asset.url} alt={clip.summary || ''}/>
			<!-- {JSON.stringify(clip.asset)} -->
		{/if}
		<!-- <h3>{clip.name}</h3> -->
		{#if html || clip.name}
			<div class="detail">
				{#if clip.name}
					<h2 class="title">{clip.name}</h2>
				{/if}
				{#if html}
					{@html html}
				{/if}
			</div>
		{/if}
	</div>
</div>

<script>
	export let clip
	import { camel_to_hyphen } from '../../utils/basic-utils.js'

	$: template = clip.template ? camel_to_hyphen(clip.template) : 'default'
	$: theme = clip.theme ? camel_to_hyphen(clip.theme) : 'default'

	// import LazyImg from '../LazyImg.svelte'
	// $: asset = modal.assets ? modal.assets[0] : false
	// $: src = asset ? source(asset, { crop: true, height: Math.floor(asset.height / asset.width * 1000), width: 1000 }) : false
	// $: alt = asset ? asset.summary : 'No description for this image.'

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	$: html = clip.html ? clip.html.replace(/<p><\/p>/gi, '') : ''
</script>

<style type="text/scss">
	.clip {
		padding: 50rem;
		background-color: white;
	}
	.detail {
		& :global {
			> p:first-child::first-letter {
				float: left;
				margin: -6rem 0 0 0;
				padding: 0 12rem 6rem 0;
				// background-color: red;
				font-size: 100rem;
				line-height: 80rem;
			}
			.media {
				width: 100%;
				margin: 50rem 0;
				line-height: 0;
			}
			img,
			video {
				margin: 0;
				width: 100%;
			}
			.media + .source,
			.media + .caption {
				margin: -44rem 0 50rem;
			}
			.media + .source + .caption {
				margin: -48rem 0 50rem;
			}
			.source {
				color: #b2b2b2;
				font: $light 13rem/18rem $font;
			}
			.caption {
				font: $bold 13rem/18rem $font;
				text-transform: uppercase;
			}
			.media,
			.source,
			.caption {
				p {
					margin: 0;
				}
			}
		}
	}
</style>