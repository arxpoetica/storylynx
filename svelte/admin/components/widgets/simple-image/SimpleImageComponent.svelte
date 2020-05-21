<div class="wrapper">
	<input type="text" bind:value={src} placeholder="Paste an image URL..."/>
	<img {src} alt="No alt."/>
</div>

<script>
	export let src = ''
</script>
