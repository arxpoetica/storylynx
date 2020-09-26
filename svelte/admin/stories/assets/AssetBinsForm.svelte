<div class="bins">

	<!-- order: 1 -->
	<!-- transition: null -->

	<!-- html_blocks: -->
		<!-- id: => "ckallogw95ttr0974myhb9hvs", -->
		<!-- name: => "Testing testing OUR BELOVED JOHNNY TEST", -->
		<!-- template: => "FeatureImageDescription", -->
		<!-- color: => null, -->
		<!-- code: => ..., -->
		<!-- html: => "<h2>...</h2>" -->

	{#each $clip.asset_bins as bin, index (bin.id)}
		<div class="bin rows">
			<!-- <h3>Asset Bin {index + 1}</h3> -->
			<Select
				label="Assets Transition"
				bind:value={bin.transition}
				options={$enums.asset_transitions}
			/>
			<div class="assets">
				<div class="tools">
					<p class="instructions">Click on a row below to show / hide details.</p>
				</div>
				{#if bin.assets.length}
					{#each bin.assets as asset, index}
						<AssetRow bind:asset {index}/>
					{/each}
				{:else}
					<p>[No assets]</p>
				{/if}
			</div>
			<!-- {#if bin.html_blocks.length}
				<div class="html-blocks">
					<h3>HTML Blocks</h3>
					{#each bin.html_blocks as block, block_index}
						<HtmlBlock bind:block {bin_index} {block_index} {selectedclip}/>
					{/each}
				</div>
			{/if} -->
		</div>
	{/each}
</div>

<script>
	import { preview_clip as clip, enums } from '../../../../stores/admin-store.js'

	// let template_id
	// let init
	// import { onMount } from 'svelte'
	// onMount(() => {
	// 	init = true
	// 	template_id = $clip.template
	// })
	// $: if (init) { $clip.template = template_id }

	import AssetRow from './AssetRow.svelte'
	// import Input from '../../components/elements/Input.svelte'
	import Select from '../../components/elements/Select.svelte'
	// import MultiSelect from '../../components/elements/MultiSelect.svelte'





	// import { seq } from '../../../../stores/admin-store.js'

	// export let asset
	// export let open

	// import Input from '../../components/elements/Input.svelte'
	// // import Select from '../../components/elements/Select.svelte'
	// // import Button from '../../components/elements/Button.svelte'
	// import Panel from '../../components/widgets/Panel.svelte'
	// // import Errors from '../../components/widgets/Errors.svelte'

	// // import { POST } from '../../../../utils/loaders.js'

	// let errors = []
	// let saving = false
	// async function save() {
	// 	saving = true
	// 	// .......
	// 	saving = false
	// 	open = false
	// }
</script>

<style type="text/scss">
	// .bins {}
	.bin {
		margin: 0 0 20rem;
		padding: 20rem;
		// background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		border-radius: 12rem;
	}
	.assets {
		display: grid;
		grid-gap: 3rem;
	}
	.instructions {
		font: 13rem/1 var(--admin-font);
		opacity: 0.6;
	}
</style>
