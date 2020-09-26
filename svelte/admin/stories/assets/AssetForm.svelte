<div class="asset-form rows">

	<div class="row full">
		<Input
			label="Caption"
			bind:value={asset.caption}
		/>
	</div>
	<div class="row full">
		<Input
			label="Source"
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

<script>
	export let asset
	// export let index

	import { enums } from '../../../../stores/admin-store.js'

	import Checkbox from '../../components/elements/Checkbox.svelte'
	import Input from '../../components/elements/Input.svelte'
	import Select from '../../components/elements/Select.svelte'
</script>

<style type="text/scss">
	.asset-form {
		// display: flow-root;
		margin: 12rem 0 10rem 22rem;
		padding: 20rem;
		background-color: rgba(var(--admin-accent-0-rgb), 0.25);
		border-radius: 8rem;
	}
</style>
