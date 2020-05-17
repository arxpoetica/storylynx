{#if $items}
	<div class="nest">
		{#each $items as item, index}
			{#if index < 50 && item.mime_type.includes('image')}
				<div class="egg" on:click={() => move_to_column(item, index)}>
					<div class="bg" style="background-image:url(https://media.graphcms.com/output=format:jpg/resize=,width:225/{item.handle});"></div>
					<h2>{item.filename}</h2>
				</div>
			{/if}
		{/each}
	</div>
{/if}

<script>
	export let items
	export let type

	function move_to_column(item, index) {
		if (type === 'assets') {

		} else if (type === 'groups') {

		} else /* playground */ {

		}
	}
</script>

<style type="text/scss">
	.nest {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120rem, 1fr));
		grid-gap: 20rem;
	}
	.egg {
		position: relative;
		padding: 0 0 100%;
		background-color: #222;
		cursor: pointer;
		user-select: none;
		&:hover {
			h2 {
				transition: opacity 0.3s ease-in-out;
				opacity: 1;
			}
		}
	}
	.bg {
		position: absolute;
		top: 20rem;
		right: 20rem;
		bottom: 20rem;
		left: 20rem;
		background: none no-repeat center transparent;
		background-size: contain;
	}
	h2 {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 10rem;
		right: 10rem;
		bottom: 10rem;
		left: 10rem;
		margin: 0;
		color: white;
		background-color: rgba(0, 0, 0, 0.6);
		font: 12rem/1 var(--admin-font);
		word-break: break-word;
		opacity: 0;
	}
</style>
