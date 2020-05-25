{#if TemplateWrapper}
	<TemplateWrapper {clip} cliporder={index + 1}/>
{/if}

<script>
	export let clip
	export let index

	// DO NOT DELETE THESE TWO LINES!!! Rollup relies on the next line to replace code
	import TemplateWrapper from '{% INSERT ROLLUP CODE HERE %}/_TemplateWrapper.svelte'
</script>
