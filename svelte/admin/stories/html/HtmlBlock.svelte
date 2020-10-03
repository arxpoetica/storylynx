<div class="html-block">
	{#if !edit_html}
		<HtmlCode {block}/>
		{#if selectedclip}
			<div class="create-html">
				<Button label="{html_edit_str(block.code)} HTML" classes="good blank" handler={() => edit_html = true}/>
			</div>
		{/if}
	{/if}
</div>

<script>
	export let block
	export let selectedclip
	let edit_html = false

	import Button from '../../components/elements/Button.svelte'
	import HtmlCode from './HtmlCode.svelte'

	const html_edit_str = code => Object.keys(code).length ? 'Edit' : 'Add'
</script>

<style type="text/scss">
	.html-block { margin: 6rem 0 0; }
	.create-html { margin: 6rem 0 0 6rem; }
</style>
