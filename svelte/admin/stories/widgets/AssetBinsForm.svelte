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
		<div class="bin">
			<!-- <h3>Asset Bin {index + 1}</h3> -->
			<Select
				label="Assets Transition"
				bind:value={bin.transition}
				required={true}
				options={$enums.asset_transitions}
			/>
			<div class="assets">
				{#if bin.assets.length}
					{#each bin.assets as asset, index}
						<AssetForm {asset} {index}/>
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
	import {
		preview_clip as clip,
		enums,
	} from '../../../../stores/admin-store.js'

	// let template_id
	// let init
	// import { onMount } from 'svelte'
	// onMount(() => {
	// 	init = true
	// 	template_id = $clip.template
	// })
	// $: if (init) { $clip.template = template_id }

	import AssetForm from './AssetForm.svelte'
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



	// // id: "ckc23pukxchi609745yhzti2o",
	// // handle: "TEKSlLV7RuKsMiclcXwJ",
	// // url: "https://media.graphcms.com/TEKSlLV7RuKsMiclcXwJ",
	// // source: null,
	// // caption: "Johnny Swinging at December, 1956 Bing Crosby Clinic ",
	// // width: null,
	// // height: null,
	// // contain: null,
	// // filename: "Johnny Miller at 1956 Bing Crosby Clinic.mp4",
	// // mime_type: "video/mp4",
	// // bg_pos: null,
	// // volume: null,
	// // play_once: null,
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
	// .row {
	// 	display: grid;
	// 	align-items: flex-start;
	// 	grid-template-columns: 2fr 1fr;
	// 	grid-column-gap: 20rem;
	// 	max-width: var(--admin-panel-width);
	// 	&.full { grid-template-columns: 1fr; }
	// 	&.styles { grid-template-columns: repeat(5, 1fr); }
	// }
	// .label {
	// 	margin: 0 0 8rem;
	// 	font: bold 15rem/1 var(--admin-font);
	// }
	// .sublabel {
	// 	margin: 0 0 8rem;
	// 	font: 13rem/1 var(--admin-font);
	// 	opacity: 0.6;
	// }
	// .nav-checkbox {
	// 	margin-top: 22rem;
	// }
	.assets {
		display: grid;
		grid-gap: 3rem;
	}


	// .contents :global(select) {
	// 	max-width: 370rem;
	// }
	// img,
	// video {
	// 	width: 100%;
	// }
	// .unknown-mimetype {
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	height: 200rem;
	// 	background-color: var(--admin-accent-1);
	// }


</style>
