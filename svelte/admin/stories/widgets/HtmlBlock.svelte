<div class="html-block">
	{#if edit_html}
		<HtmlEditor
			bind:name={block.name}
			bind:template={block.template}
			bind:color={block.color}
			bind:data={block.code}
			update={data => $clip.asset_bins[bin_index].html_blocks[block_index].code = data}
			save={data => save(data, bin_index, block_index)}
			cancel={backup => cancel(backup, bin_index, block_index)}
		/>
	{:else}
		{#if Object.keys(block.code).length}
			<h3>HTML</h3>
			<code>{block.html || ''}</code>
		{/if}
		{#if selectedclip}
			<div class="create-html">
				<Button title="{html_edit_str(block.code)} HTML" classes="good" handler={() => edit_html = true}/>
			</div>
		{/if}
	{/if}
</div>

<script>
	export let block
	export let bin_index
	export let block_index
	export let selectedclip
	let edit_html = false

	import { saving, saveable, preview_clip as clip } from '../../../../stores/admin-store.js'

	import Button from '../../components/elements/Button.svelte'
	import HtmlEditor from './HtmlEditor.svelte'

	const html_edit_str = code => Object.keys(code).length ? 'Edit' : 'Add'

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session } = get_sapper_stores()
	import { code_to_html } from './html-utils.js'
	import { POST } from '../../../../utils/loaders.js'

	const save = async(data, bin_index, block_index) => {
		$saving = true

		const block = $clip.asset_bins[bin_index].html_blocks[block_index]
		block.html = code_to_html(block.code)
		block.asset_bin_id = $clip.asset_bins[bin_index].id


		// for each
		const { html_block } = await POST(
			'/api/admin/stories/clip-upsert.post',
			Object.assign({ cookie: $session.cookie }, block),
		)
		$clip.asset_bins[bin_index].html_blocks[block_index] = html_block

		edit_html = false
		$saving = false
	}

	const cancel = (backup, bin_index, block_index) => {
		$clip.asset_bins[bin_index].html_blocks[block_index].code = backup
		$clip.asset_bins[bin_index].html_blocks[block_index].html
			= code_to_html($clip.asset_bins[bin_index].html_blocks[block_index].code)
		edit_html = false
	}
</script>

<style type="text/scss">
	.html-block {
		margin: 40rem 0 0;
	}
	code {
		overflow: auto;
		display: block;
		margin: 0;
		padding: 6rem;
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		border-radius: 4rem;
		color: rgba(var(--admin-text-rgb), 0.5);
		font: 13rem monospace;
		word-break: break-all;
	}
	.create-html {
		margin: 12rem 0 0;
	}
</style>
