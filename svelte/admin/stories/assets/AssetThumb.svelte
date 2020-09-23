<div class="thumb" on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
	{#if asset.mime_type.includes('image')}
		<div class="img" style="background-image:url({src(asset.handle)});"></div>
	{:else if asset.mime_type.includes('video')}
		<div class="svg"><VideoIcon/></div>
	{:else if asset.mime_type.includes('audio')}
		<div class="svg"><AudioIcon/></div>
	{:else}
		<div class="asset">
			{asset.mime_type}
		</div>
	{/if}
	{#if hovering}
		<div class="popup">
			{#if asset.mime_type.includes('image')}
				<img src={src(asset.handle)} alt={asset.filename}/>
			{:else if asset.mime_type.includes('video')}
				<!-- svelte-ignore a11y-media-has-caption -->
				<video controls autoplay loop><source src={asset.url} type={asset.mime_type}/></video>
			<!-- {:else if asset.mime_type.includes('audio')} -->
			{:else}
				{asset.mime_type}
			{/if}
		</div>
	{/if}
</div>

<script>
	export let asset
	let hovering = false

	import VideoIcon from '../../../svg/asset-icon-video.svelte'
	import AudioIcon from '../../../svg/asset-icon-audio.svelte'

	function src(handle) {
		return `https://media.graphcms.com/output=format:jpg/resize=width:600/${handle}`
	}
</script>

<style type="text/scss">
	.thumb {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 32rem;
	}
	.img {
		position: relative;
		width: 100%;
		padding: 0 0 100%;
		background: none no-repeat center transparent;
		background-size: cover;
	}
	.svg {
		width: 22rem;
		height: 22rem;
	}
	.popup {
		display: flex;
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
