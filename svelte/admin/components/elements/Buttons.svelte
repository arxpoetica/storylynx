<div class="buttons">
	<slot></slot>
</div>

<style type="text/scss">
	.buttons {
		// min-width: 50%;
		// display: grid;
		// grid-gap: 10rem;
		// grid-template-columns: repeat(auto-fill, minmax(150rem, 1fr));
		display: flex;
		align-items: center;
		// margin: 0 -6rem;
		:global(.button) {
			margin: 0 6rem;
		}
	}
</style>
