<div
	class="thumb"
	on:mouseenter={() => hovering = true}
	on:mouseleave={() => hovering = false}
	on:click={() => {}}
>
	<ThumbIcon {asset}/>
	{#if hovering}
		<div class="popup">
			{#if asset.mime_type.includes('image')}
				<img src={src(asset.handle)} alt={asset.filename}/>
			{:else if asset.mime_type.includes('video')}
				<!-- svelte-ignore a11y-media-has-caption -->
				<video controls autoplay loop><source src={asset.url} type={asset.mime_type}/></video>
			<!-- {:else if asset.mime_type.includes('audio')} -->
			{:else if asset.mime_type.includes('html')}
				<div class="html">
					{asset.html.replace(/\s+/g, ' ').substring(0, 1000)}
				</div>
			{:else}
				<div class="other">{asset.mime_type}</div>
			{/if}
		</div>
	{/if}
</div>

<script>
	export let asset
	let hovering = false

	import ThumbIcon from './AssetThumbIcon.svelte'
	import { src } from './asset-helpers.js'
</script>

<style type="text/scss">
	.thumb {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 32rem;
	}
	.popup {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: calc(100% + 10rem);
		width: 312rem;
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
		.html {
			overflow: hidden;
			display: -webkit-box;
			padding: 10rem;
			-webkit-line-clamp: 10;
			-webkit-box-orient: vertical;
			background-color: var(--admin-accent-1);
			font: 12rem/1 var(--admin-font);
		}
		.other { height: 75rem; }
	}
</style>
