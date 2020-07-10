<div class="thumb {size}" on:click={() => handler(item, index)}>
	<div class="body">
		{#if item.mime_type.includes('image')}
			<img src={src(item.handle)} alt="..."/>
		{:else}
			<div class="description">
				{item.mime_type}
			</div>
		{/if}
		<h2>{item.filename}</h2>
	</div>
	<button class="preview" on:click|stopPropagation={preview}>Preview</button>
</div>

<script>
	export let item
	export let index
	export let size = ''
	export let handler

	function src(handle) {
		if (size === 'small') {
			return `https://media.graphcms.com/output=format:jpg/resize=,width:59,height:59,fit:crop/${handle}`
		}
		return `https://media.graphcms.com/output=format:jpg/resize=width:225/${handle}`
	}

	import { egg_preview } from '../../../../stores/admin-store.js'
	function preview() {
		$egg_preview = item
	}
</script>

<style type="text/scss">
	.thumb {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		border-radius: 12rem;
		text-align: center;
		cursor: pointer;
		user-select: none;
	}
	img {
		width: 100%;
		margin: 0 0 5rem;
		border-radius: 12rem;
	}
	.description {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rem;
		margin: 0 0 5rem;
		background-color: var(--admin-color-1);
		border-radius: 12rem;
	}
	.body {
		display: grid;
		flex: 1;
		width: 100%;
	}
	h2 {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 0 15rem;
		padding: 0 15rem;
		color: rgba(var(--admin-text-rgb), 0.5);
		font: 11rem/1 var(--admin-font);
		word-break: break-word;
	}
	.preview {
		margin: 0 0 15rem;
		padding: 0;
		border: 0;
		background-color: transparent;
		font: 13rem/1 var(--admin-font);
		text-transform: uppercase;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
</style>
