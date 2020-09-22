<Panel title="Edit Asset" subtitle={asset.filename} bind:open {saving}>

	<div class="asset">
		{#if asset.mime_type.includes('image')}
			<img
				src="https://media.graphcms.com/output=format:jpg/resize=width:520/{asset.handle}"
				alt={asset.filename}
			/>
		{:else if asset.mime_type.includes('video')}
			<video controls><source src={asset.url} type={asset.mime_type}/></video>
		{:else}
			<div class="unknown-mimetype">{asset.mime_type}</div>
		{/if}
		<!-- <button class="preview" on:click|stopPropagation={preview}>Preview</button> -->
	</div>
</Panel>

<script>
	import { seq } from '../../../../stores/admin-store.js'

	export let asset
	export let open

	// import Input from '../../components/elements/Input.svelte'
	// import Select from '../../components/elements/Select.svelte'
	// import Button from '../../components/elements/Button.svelte'
	import Panel from '../../components/widgets/Panel.svelte'
	// import Errors from '../../components/widgets/Errors.svelte'

	// import { POST } from '../../../../utils/loaders.js'

	let errors = []
	let saving = false
	async function save() {
		saving = true
		// .......
		saving = false
		open = false
	}



	// id: "ckc23pukxchi609745yhzti2o",
	// handle: "TEKSlLV7RuKsMiclcXwJ",
	// url: "https://media.graphcms.com/TEKSlLV7RuKsMiclcXwJ",
	// source: null,
	// caption: "Johnny Swinging at December, 1956 Bing Crosby Clinic ",
	// width: null,
	// height: null,
	// contain: null,
	// filename: "Johnny Miller at 1956 Bing Crosby Clinic.mp4",
	// mime_type: "video/mp4",
	// bg_pos: null,
	// volume: null,
	// play_once: null,
</script>

<style type="text/scss">
	.contents :global(select) {
		max-width: 370rem;
	}
	img,
	video {
		width: 100%;
	}
	.unknown-mimetype {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200rem;
		background-color: var(--admin-accent-1);
	}
</style>
