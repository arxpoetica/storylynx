<!-- <p>bins: {JSON.stringify(bins)}</p> -->

{#if bins.length}
	<div class="bins">
		{#each bins as bin, bin_index}
			<div class="bin-section">
				{#if bin.assets.length}
					<!-- <p>bin: {JSON.stringify(Object.keys(bin))}</p> -->
					<p>order: {JSON.stringify(bin.order)}</p>
					<p>transition: {JSON.stringify(bin.transition)}</p>
					<div class="bin">
						{#each bin.assets as asset, index}
							<AssetThumb item={asset} {index}/>
						{/each}
					</div>
					{#if edit_html}
						<HtmlEditor
							bind:name={bin.html_block.name}
							bind:data={bin.html_block.code}
							update={data => $clip.asset_bins[bin_index].html_block.code = data}
							save={data => save(data, bin_index)}
						/>
					{:else}
						{#if Object.keys(bin.html_block.code).length}
							<pre>HTML: {@html bin.html_block.html || ''}</pre>
						{/if}
						<div class="create-html">
							<Button title="{html_edit_str(bin.html_block.code)} HTML" classes="good" handler={() => edit_html = true}/>
						</div>
					{/if}
				{:else}
					Empty bin
				{/if}
			</div>
		{/each}
	</div>
{/if}

<script>
	export let bins
	let edit_html = false

	import { saving, saveable, html_templates, preview_clip as clip } from '../../../../stores/admin-store.js'

	import Button from '../../components/elements/Button.svelte'
	import AssetThumb from '../../components/widgets/AssetThumb.svelte'
	import HtmlEditor from './HtmlEditor.svelte'

	const html_edit_str = code => Object.keys(code).length ? 'Edit' : 'Add'

	const save = async(data, bin_index) => {
		$clip.asset_bins[bin_index].html_block.code = data
		// console.group('-----')
		// console.log(bin_index)
		// console.log(data)
		// console.groupEnd()
		edit_html = false
	}
</script>

<style type="text/scss">
	.bins {
		padding: 2rem;
		border: 1rem solid var(--admin-blue-lighter);
		background-color: var(--admin-blue-faint);
	}
	.bin-section {
		margin: 0 0 2rem;
		padding: 20rem;
		background-color: white;
		border: 1rem solid var(--admin-blue-lighter);
		&:last-child {
			margin: 0;
		}
	}
	.bin {
		display: grid;
		grid-template-columns: repeat(auto-fit, 100rem);
		grid-gap: 10rem;
		margin-bottom: 10rem;
		margin: 0 0 10rem;
		&:last-child {
			margin: 0;
		}
	}
	pre {
		margin: 0 0 10rem;
	}
</style>
