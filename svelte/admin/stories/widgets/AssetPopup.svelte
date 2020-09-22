<div class="popup" class:hovering>
	{#if hovering}
		{#if asset.mime_type.includes('image')}
			<img src={src(asset.handle)} alt={asset.filename}/>
		{:else if asset.mime_type.includes('video')}
			<video controls autoplay loop><source src={asset.url} type={asset.mime_type}/></video>
		<!-- {:else if asset.mime_type.includes('audio')} -->
		{:else}
			{asset.mime_type}
		{/if}
	{/if}
</div>

<script>
	export let asset
	export let hovering

	function src(handle) {
		return `https://media.graphcms.com/output=format:jpg/resize=width:600/${handle}`
	}
</script>

<style type="text/scss">
	.popup {
		display: none;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: calc(100% + 10rem);
		width: 312rem;
		min-height: 100rem;
		padding: 6rem;
		background-color: var(--admin-accent-2);
		transform: translateY(-50%);
		z-index: 1;
		&.hovering { display: flex; }
		&::before {
			content: '';
			position: absolute;
			top: 50%;
			right: 100%;
			height: 100rem;
			width: 10rem;
			// background-color: red;
			transform: translateY(-50%);
		}
		img, video { width: 100%; }
	}
</style>
