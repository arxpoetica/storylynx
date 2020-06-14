<div class="thumb {size}" on:click={() => handler(item, index)}>
	<div class="evil-wrap">
		{#if item.mime_type.includes('image')}
			<div class="bg" style="background-image:url({bg(item.handle)});"></div>
		{:else}
			<div class="description">
				{item.mime_type}
			</div>
		{/if}
		<h2>{item.filename}</h2>
	</div>
	<div class="preview">
		<button on:click|stopPropagation={preview}>Preview</button>
	</div>
</div>

<script>
	export let item
	export let index
	export let size = ''
	export let handler

	function bg(handle) {
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
		position: relative;
		background-color: var(--admin-color-1);
		border: 1rem solid var(--admin-color-2);
		cursor: pointer;
		user-select: none;
		&:hover {
			h2 {
				transition: opacity 0.2s ease-in-out;
				opacity: 1;
			}
		}
		&.small {
			background-color: #222;
			border: 0;
			color: white;
			font-size: 11rem;
			.bg,
			.description {
				top: 2rem;
				right: 2rem;
				bottom: 2rem;
				left: 2rem;
			}
			h2 { font-size: 11rem; }
			.preview {
				top: calc(100% + 4rem);
				bottom: auto;
				button:hover { color: var(--admin-link); }
			}
		}
	}
	.evil-wrap {
		padding: 0 0 100%;
	}
	.bg,
	.description {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 10rem;
		right: 10rem;
		bottom: 10rem;
		left: 10rem;
		background: none no-repeat center transparent;
		background-size: contain;
	}
	h2 {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: 0;
		padding: 10rem;
		color: white;
		background-color: rgba(0, 0, 0, 0.6);
		font: 12rem/1 var(--admin-font);
		word-break: break-word;
		opacity: 0;
	}
	.preview {
		position: absolute;
		right: 0;
		bottom: 6rem;
		left: 0;
		text-align: center;
		button {
			margin: 0;
			padding: 0;
			border: 0;
			background-color: transparent;
			color: var(--admin-link);
			cursor: pointer;
			&:hover {
				color: white;
				text-decoration: underline;
			}
		}
	}
</style>
