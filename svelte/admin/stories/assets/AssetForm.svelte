<!-- <div class="asset">
	{#if asset.mime_type.includes('image')}
		<img src="https://media.graphcms.com/output=format:jpg/resize=width:520/{asset.handle}" alt={asset.filename}/>
	{:else if asset.mime_type.includes('video')}
		<video controls><source src={asset.url} type={asset.mime_type}/></video>
	{:else}
		<div class="unknown-mimetype">{asset.mime_type}</div>
	{/if}
</div> -->

<div class="asset-form" class:remove>
	<div class="header" on:click={() => editing = !editing}>
		<AssetThumb {asset}/>
		<h3><span>{asset.filename}</span></h3>
		<div class="actions">
			<Checkbox classes="alert" bind:checked={remove}/>
		</div>
	</div>
	{#if editing && !remove}
		<div class="asset-editor">

			<!-- id: => "ckaqzi5ybki470974iuecwrlj" -->
			<!-- order: => 
			<!-- width_override: => 1000 -->
			<!-- height_override: => null -->
			<!-- contain "do not bleed image": => true -->

			<!-- bg_pos (applies to video/audio): => null -->
			<!-- volume (applies to video/audio): => null -->
			<!-- play_once (TURN INTO LOOP): => null -->

			<!-- FIXME: dry this up... -->
			<div class="row">
				<Input
					label="Caption"
					sublabel=""
					bind:value={asset.caption}
				/>
			</div>
			<div class="row">
				<Input
					label="Source"
					sublabel=""
					bind:value={asset.source}
				/>
			</div>

		</div>
	{/if}
</div>

<script>
	export let asset
	// export let index
	export let remove = false

	import AssetThumb from './AssetThumb.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'
	import Input from '../../components/elements/Input.svelte'

	let editing
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
	.asset-editor {
		display: flow-root;
		margin: 12rem 0 10rem 22rem;
		padding: 20rem 20rem 0;
		background-color: rgba(var(--admin-accent-0-rgb), 0.25);
		border-radius: 8rem;
	}
</style>
