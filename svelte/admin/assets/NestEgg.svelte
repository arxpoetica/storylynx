<div class="egg {size}" on:click={() => handler(item, index)}>
	{#if item.mime_type.includes('image')}
		<img src={src(item.handle)} alt="..."/>
	{:else}
		<div class="description">
			{item.mime_type}
		</div>
	{/if}
	<div class="helps">
		<h2>{item.filename}</h2>
		<button class="preview" on:click|stopPropagation={preview}>Preview</button>
	</div>
</div>

<script>
	export let item
	export let index
	export let size
	export let handler

	function src(handle) {
		if (size === 'small') {
			return `https://media.graphcms.com/output=format:jpg/resize=,width:59,height:59,fit:crop/${handle}`
		}
		return `https://media.graphcms.com/output=format:jpg/resize=width:225/${handle}`
	}

	import { egg_preview } from '../../../stores/admin-store.js'
	function preview() {
		$egg_preview = item
	}
</script>

<style type="text/scss">
	.egg {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		padding: 15rem;
		background-color: var(--admin-accent-1);
		border-radius: 15rem;
		text-align: center;
		cursor: pointer;
		user-select: none;
		&:hover {
			background-color: var(--admin-accent-0);
		}
		&.small {
			padding: 0;
			background-color: transparent;
			border-radius: 0;
			font-size: 11rem;
			img {
				border-radius: 0;
				margin: 0 0 8rem;
			}
			h2 { display: none; }
		}
	}
	img {
		width: 100%;
		border-radius: 12rem 12rem 0 0;
	}
	.description {
		margin: 0 0 15rem;
	}
	h2 {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 0 15rem;
		padding: 10rem;
		background-color: rgba(var(--admin-accent-0-rgb), 0.75);
		border-radius: 0 0 12rem 12rem;
		font: 12rem/1 var(--admin-font);
		word-break: break-word;
	}
	.preview {
		margin: 0;
		padding: 0;
		border: 0;
		background-color: transparent;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
</style>
