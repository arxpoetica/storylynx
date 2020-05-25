{#if TemplateWrapper}
	<TemplateWrapper {clip} cliporder={index + 1}/>
{/if}

<script>
	export let clip
	export let index

	import { hyphenate } from '../../utils/basic-utils.js'
	$: if (clip) {
		clip.url_hash = clip.slug ? `nav-${hyphenate(clip.slug.toLowerCase())}` : `nav-${clip.id}`
	}

	// DO NOT DELETE THESE TWO LINES!!! Rollup relies on the next line to replace code
	import TemplateWrapper from '{% INSERT ROLLUP CODE HERE %}/_TemplateWrapper.svelte'
</script>
