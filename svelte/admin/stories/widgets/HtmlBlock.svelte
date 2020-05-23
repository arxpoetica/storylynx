{#if edit_html}
	<HtmlEditor
		bind:name={block.name}
		bind:data={block.code}
		update={data => $clip.asset_bins[bin_index].html_block.code = data}
		save={data => save(data, bin_index)}
		cancel={backup => cancel(backup, bin_index)}
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

<script>
	export let block
	export let bin_index
	export let selectedclip
	let edit_html = false

	import { saving, saveable, html_templates, preview_clip as clip } from '../../../../stores/admin-store.js'

	import Button from '../../components/elements/Button.svelte'
	import HtmlEditor from './HtmlEditor.svelte'

	const html_edit_str = code => Object.keys(code).length ? 'Edit' : 'Add'

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session } = get_sapper_stores()
	import { code_to_html } from './html-utils.js'
	import { POST } from '../../../../utils/loaders.js'

	const save = async(data, bin_index) => {
		$saving = true

		const block = $clip.asset_bins[bin_index].html_block
		block.html = code_to_html(block.code)
		block.asset_bin_id = $clip.asset_bins[bin_index].id

		const { html_block } = await POST(
			'/api/admin/stories/clip-update.post',
			Object.assign({ cookie: $session.cookie }, block),
		)
		$clip.asset_bins[bin_index].html_block = html_block

		edit_html = false
		$saving = false
	}

	const cancel = (backup, bin_index) => {
		$clip.asset_bins[bin_index].html_block.code = backup
		$clip.asset_bins[bin_index].html_block.html = code_to_html($clip.asset_bins[bin_index].html_block.code)
		edit_html = false
	}
</script>

<style type="text/scss">
	code {
		overflow: auto;
		display: block;
		margin: 0 0 10rem;
		padding: 6rem;
		background-color: var(--admin-gray-lighter);
		border: 1px solid var(--admin-gray-light);
		font: 13rem monospace;
		word-break: break-all;
	}
</style>
