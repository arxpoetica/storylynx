<div class="clip-wrap" style={bg}>
	<div class="detail">
		{#if clip.name}
			<h2 class="title">{clip.name}</h2>
			<!-- TODO: HTML here?????????? -->
		{/if}
	</div>
</div>

<script>
	export let clip
	export let template
	export let theme
	export let html

	let bg
	$: if (template === 'fullscreen' || template === 'fullscreen-no-border') {
		if (theme === 'default' || theme.indexOf('background-') > -1) {
			// FIXME: resize??????
			bg = `background-image:url(${clip.asset.url});`
		}
	}
</script>

<style type="text/scss">
</style>
