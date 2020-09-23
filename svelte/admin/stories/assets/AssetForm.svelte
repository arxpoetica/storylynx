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
		<div class="asset-editor rows">

			<!-- id: => "ckaqzi5ybki470974iuecwrlj" -->
			<!-- order: => 

			<!-- FIXME: dry this up... -->
			<div class="row full">
				<Input
					label="Caption"
					sublabel=""
					bind:value={asset.caption}
				/>
			</div>
			<div class="row full">
				<Input
					label="Source"
					sublabel=""
					bind:value={asset.source}
				/>
			</div>
			<div class="row split">
				<Input
					label="Width Override"
					sublabel="This will override the default width of the asset in pixels."
					type="number"
					bind:value={asset.width}
				/>
				<Input
					label="Height Override"
					sublabel="This will override the default height of the asset in pixels."
					type="number"
					bind:value={asset.height}
				/>
			</div>
			{#if asset.mime_type.includes('image') || asset.mime_type.includes('video')}
				<div class="row full">
					<Select
						label="Background Position Anchor"
						bind:value={asset.bg_pos}
						options={$enums.background_positions}
					/>
				</div>
			{/if}
			<div class="row full">
				<Checkbox
					label="Do not bleed"
					sublabel="This forces the asset to stay within the bounds of the containing box."
					bind:checked={asset.contain}
				/>
			</div>
			{#if asset.mime_type.includes('video') || asset.mime_type.includes('audio')}
				<div class="row split">
					<Input
						label="Volume"
						sublabel="
							Initial volume level for media assets.
							Enter a value between 0 and 10.
							Default (if none entered is 10)."
						type="number"
						bind:value={asset.volume}
					/>
					<Checkbox label="Play only once" bind:checked={asset.play_once}/>
				</div>
			{/if}

		</div>
	{/if}
</div>

<script>
	export let asset
	// export let index
	export let remove = false

	let editing

	import { enums } from '../../../../stores/admin-store.js'

	import AssetThumb from './AssetThumb.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'
	import Input from '../../components/elements/Input.svelte'
	import Select from '../../components/elements/Select.svelte'
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
		// display: flow-root;
		margin: 12rem 0 10rem 22rem;
		padding: 20rem;
		background-color: rgba(var(--admin-accent-0-rgb), 0.25);
		border-radius: 8rem;
	}
</style>
