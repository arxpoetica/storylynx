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

<div class="thumb" class:remove on:click={() => $handlers.edit_asset(asset)}>
	{#if asset.mime_type.includes('image')}
		<div class="asset" style="background-image:url({src(asset.handle)});"></div>
	{:else}
		<div class="asset">
			{asset.mime_type}
		</div>
	{/if}
	<!-- <button class="preview" on:click|stopPropagation={preview}>Preview</button> -->
	<div class="asset-checkbox" class:remove>
		<Checkbox classes="alert" bind:checked={remove}/>
	</div>
</div>

<script>
	export let asset
	export let index
	export let handler
	export let remove = false
	import { handlers } from '../../../../stores/admin-store.js'
	import Checkbox from '../../components/elements/Checkbox.svelte'
	function src(handle) {
		return `https://media.graphcms.com/output=format:jpg/resize=width:300,height:300/${handle}`
	}
</script>

<style type="text/scss">
	.thumb {
		position: relative;
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		cursor: pointer;
		&:hover,
		&.remove {
			.asset-checkbox { display: block; }
		}
		&.remove {
			box-shadow: 0 0 0 3rem var(--admin-alert);
			&::after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background-color: var(--admin-alert);
				opacity: 0.25;
				z-index: 1;
			}
		}
	}
	.asset {
		position: relative;
		padding: 0 0 100%;
		background: none no-repeat center transparent;
		background-size: cover;
	}
	.asset-checkbox {
		display: none;
		position: absolute;
		right: 5rem;
		bottom: 5rem;
		z-index: 2;
	}
</style>
