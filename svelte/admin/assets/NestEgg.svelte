<div class="egg" on:click={() => handler(item, index)}>
	{#if item.mime_type.includes('image')}
		<div class="bg" style="background-image:url(https://media.graphcms.com/output=format:jpg/resize=,width:225/{item.handle});"></div>
	{:else}
		<div class="description">
			{item.mime_type}
		</div>
	{/if}
	<h2>{item.filename}</h2>
</div>

<script>
	export let item
	export let index
	export let handler
</script>

<style type="text/scss">
	.egg {
		position: relative;
		padding: 0 0 100%;
		background-color: var(--admin-blue-faint);
		cursor: pointer;
		user-select: none;
		&:hover {
			h2 {
				transition: opacity 0.2s ease-in-out;
				opacity: 1;
			}
		}
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
</style>
