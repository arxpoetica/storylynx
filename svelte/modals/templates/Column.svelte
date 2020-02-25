<div class="clip template-{template} {themes.join(' ')} transition-{transition} clip-{clip.order}">
	<!-- TODO: use an HTML component wrapper for shared CSS styles... -->
	<!-- TODO: use an HTML component wrapper for shared CSS styles... -->
	<!-- TODO: use an HTML component wrapper for shared CSS styles... -->
	<!-- TODO: use an HTML component wrapper for shared CSS styles... -->
	<!-- TODO: use an HTML component wrapper for shared CSS styles... -->
	<!-- TODO: use an HTML component wrapper for shared CSS styles... -->
	{#if clip.name}
		<h2 class="title">{clip.name}</h2>
		<!-- TODO: HTML here?????????? -->
	{/if}
	{#if html}
		{@html html}
	{/if}
</div>

<script>
	export let clip
	export let template
	export let themes
	export let transition
	export let html
</script>

<style type="text/scss">
	.clip {
		width: 100%;
		max-width: 720rem;
		padding: 60rem;
		margin: 0 auto;
		@media (--small-down) { padding: 0 20rem; }
	}
</style>