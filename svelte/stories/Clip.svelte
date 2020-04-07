<!-- {#if clip.order === '0000-0020'} -->
<!-- <div>{JSON.stringify(clip)}</div> -->
<!-- <div>{clip.template}</div> -->
<!-- <div>{clip.order}</div> -->
<div bind:this={elem} class="clip clip-{transition}">
	<div class="clip-wrap" style={animation_style}>
		<svelte:component this={component[clip.template]} clip={vars}/>
	</div>
</div>
<!-- {/if} -->

<script>
	import { onMount } from 'svelte'
	export let clip
	let elem

	let component
	// INSERT ROLLUP CODE HERE // DO NOT DELETE THIS LINE!!! Rollup relies on it to replace code

	import { story_scroll, root, rootMargin, threshold } from '../../stores/app-store.js'
	import { camel_to_hyphen } from '../../utils/basic-utils.js'
	import { animate_clip } from '../../utils/transition-utils.js'

	let intersecting = false

	// $: scroll = intersecting ? $story_scroll : false
	$: transition = clip.transition ? camel_to_hyphen(clip.transition) : 'default'
	$: animation_style = animate_clip(elem, clip.transition, intersecting, $story_scroll/* , clip.order */)

	$: vars = Object.assign({}, clip, {
		template: clip.template ? camel_to_hyphen(clip.template) : 'default',
		themes: clip.themes.length ? clip.themes.map(theme => `theme-${camel_to_hyphen(theme)}`) : ['theme-default'],
		transition,
		// FIXME: ????? CAN I EVEN???
		// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
		html: clip.html ? clip.html.replace(/<p><\/p>/gi, '') : '',
		intersecting,
	})

	onMount(() => {
		const observer = new IntersectionObserver((entries, observer) => {
			if (entries[0].isIntersecting) {
				intersecting = true
			} else {
				intersecting = false
			}
		}, {
			root: $root,
			rootMargin: $rootMargin,
			threshold:  $threshold,
		})
		observer.observe(elem)
	})
</script>

<style type="text/scss">
	.clip {
		position: relative;
		font: 16rem/1.4 $font;
	}
	.clip-wrap {
		position: relative;
	}
	// .detail {
	// 	& :global {
	// 		> p:first-child::first-letter {
	// 			float: left;
	// 			margin: -6rem 0 0 0;
	// 			padding: 0 12rem 6rem 0;
	// 			// background-color: red;
	// 			font-size: 100rem;
	// 			line-height: 80rem;
	// 		}
	// 		.media {
	// 			width: 100%;
	// 			margin: 50rem 0;
	// 			line-height: 0;
	// 		}
	// 		img,
	// 		video {
	// 			margin: 0;
	// 			width: 100%;
	// 		}
	// 		.media + .source,
	// 		.media + .caption {
	// 			margin: -44rem 0 50rem;
	// 		}
	// 		.media + .source + .caption {
	// 			margin: -48rem 0 50rem;
	// 		}
	// 		.source {
	// 			color: #b2b2b2;
	// 			font: $light 13rem/18rem $font;
	// 		}
	// 		.caption {
	// 			font: $bold 13rem/18rem $font;
	// 			text-transform: uppercase;
	// 		}
	// 		.media,
	// 		.source,
	// 		.caption {
	// 			p {
	// 				margin: 0;
	// 			}
	// 		}
	// 	}
	// }
</style>
