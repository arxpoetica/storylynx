<!-- id: => "ckaqzi5ybki470974iuecwrlj" -->
<!-- order: => 
<!-- source: => "The Johnny Miller Archive" -->
<!-- caption: => "Bring back the spiral notebook." -->
<!-- width_override: => 1000 -->
<!-- height_override: => null -->
<!-- contain "do not bleed image": => true -->

<!-- bg_pos (applies to video/audio): => null -->
<!-- volume (applies to video/audio): => null -->
<!-- play_once (TURN INTO LOOP): => null -->


<!-- <div class="asset">
	{#if asset.mime_type.includes('image')}
		<img src="https://media.graphcms.com/output=format:jpg/resize=width:520/{asset.handle}" alt={asset.filename}/>
	{:else if asset.mime_type.includes('video')}
		<video controls><source src={asset.url} type={asset.mime_type}/></video>
	{:else}
		<div class="unknown-mimetype">{asset.mime_type}</div>
	{/if}
</div> -->

<div class="asset-form" class:remove on:click={() => $handlers.edit_asset(asset)}>
	<div class="header">
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
			<Popup {asset} {hovering}/>
		</div>
		<h3><span>{asset.filename}</span></h3>
		<div class="actions">
			<Checkbox classes="alert" bind:checked={remove}/>
		</div>
	</div>
</div>

<script>
	export let asset
	export let index
	export let handler
	export let remove = false

	let hovering = false

	import { handlers } from '../../../../stores/admin-store.js'
	import Popup from './AssetPopup.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'
	import VideoIcon from '../../../svg/asset-icon-video.svelte'
	import AudioIcon from '../../../svg/asset-icon-audio.svelte'

	function src(handle) {
		return `https://media.graphcms.com/output=format:jpg/resize=width:600/${handle}`
	}
</script>

<style type="text/scss">
	.asset-form {
		position: relative;
		cursor: pointer;
		// &:hover { background-color: rgba(var(--admin-text-rgb), 0.1); }
		&.remove { color: var(--admin-alert-light); }
		&:hover,
		&.remove {
			.actions { display: block; }
		}
	}
	.header {
		display: grid;
		grid-template-columns: 32rem 1fr 32rem;
		grid-gap: 10rem;
	}
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
	h3 {
		overflow: hidden;
		display: flex;
		align-items: center;
		margin: 0;
		span {
			overflow: hidden;
			display: block;
			font: 13rem/1 var(--admin-font);
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.actions {
		display: none;
		// :global(> label) { transform: scale(0.8); }
	}
</style>
