{#if TemplateWrapper}
	<TemplateWrapper {clip}/>
{/if}

<script>
	export let clip
	// DO NOT DELETE THESE TWO LINES!!! Rollup relies on the next line to replace code
	import TemplateWrapper from '{% INSERT ROLLUP CODE HERE %}/_TemplateWrapper.svelte'
</script>
