{#if Object.keys(block.code).length}
	<code>{html}{#if expandable}{#if !expanded}...{/if}&nbsp;<Button title={expanded ? 'less' : 'more'} classes="blank" handler={() => expanded = !expanded}/>{/if}</code>
{/if}

<script>
	export let block
	import Button from '../../components/elements/Button.svelte'

	let expanded = false
	$: html = expanded ? block.html.trim() || '' : block.html.slice(0, 45).trim()
	$: expandable = block.html.length > html.length || expanded
</script>

<style type="text/scss">
	code {
		overflow: auto;
		display: block;
		margin: 0;
		padding: 6rem;
		max-width: 450rem;
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		border-radius: 4rem;
		color: rgba(var(--admin-text-rgb), 0.5);
		font: 13rem monospace;
		word-break: break-all;
		:global(.button) {
			line-height: inherit;
			font-size: inherit;
		}
	}
	expandable {
		display: inline;
		color: var(--admin-text);
		cursor: pointer;
		&:hover { text-decoration: underline; }
	}
</style>
