<!-- {#if clip.order === '1-1-1'} -->
{#if clip.template}
	<!-- <div class="asdf">{clip.template}</div> -->
	<svelte:component this={component[clip.template]} {clip} {html} {template} {theme}/>
{:else}
	<svelte:component this={Default} {clip} {html} {template} {theme}/>
{/if}
<!-- {/if} -->

<script>
	export let clip
	import { camel_to_hyphen } from '../../utils/basic-utils.js'

	import Default from './templates/Default.svelte'
	import Column from './templates/Column.svelte'
	import Fullscreen from './templates/Fullscreen.svelte'
	import TwoUp from './templates/TwoUp.svelte'
	import ThreeUp from './templates/ThreeUp.svelte'
	import PhotoGrid from './templates/PhotoGrid.svelte'
	import TitleCard from './templates/TitleCard.svelte'

	$: template = clip.template ? camel_to_hyphen(clip.template) : 'default'
	$: theme = clip.theme ? camel_to_hyphen(clip.theme) : 'default'

	let component = {
		Column,
		ColumnLeft: Column,
		ColumnRight: Column,
		Fullscreen,
		FullscreenNoBorder: Fullscreen,
		TwoUp,
		ThreeUp,
		PhotoGrid,
		TitleCard,
	}

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	$: html = clip.html ? clip.html.replace(/<p><\/p>/gi, '') : ''
</script>

<!-- <style type="text/scss">
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
</style> -->
