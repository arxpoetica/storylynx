<svelte:body on:click={event => close(event.target)}/>

<div bind:this={dropdown} class="dropdown" class:open class:hide>
	<button class="reveal" on:click={() => open = !open}><PostIcon/></button>
	<div class="menu">
		<slot></slot>
	</div>
</div>

<script>
	import PostIcon from '../../../svg/admin-post.svelte'
	export let open = false
	export let hide = false
	let dropdown

	function close(target) {
		if (!dropdown.contains(target)) {
			open = false
		}
	}
</script>

<style type="text/scss">
	.dropdown {
		position: relative;
		display: flex;
		margin: 0 0 0 10rem;
		&.open .menu { display: grid; }
		&.hide { display: none; }
	}
	.reveal {
		width: 34rem;
		height: 34rem;
		margin: 0;
		padding: 0;
		padding: 8rem;
		background-color: var(--admin-bg);
		border: 0;
		border-radius: 100%;
		line-height: 0;
		color: var(--admin-accent-4);
		transition: all 0.15s ease-in-out;
		cursor: pointer;
		-webkit-appearance: none;
		user-select: none;
		&:hover,
		.open & {
			background-color: var(--admin-accent-0);
		}
		&:focus {
			outline: none;
			box-shadow: var(--admin-form-shadow);
		}
	}
	.menu {
		display: none;
		grid-gap: 5rem;
		position: absolute;
		top: calc(100% + 8rem);
		right: 0;
		padding: 10rem;
		border-radius: 5rem;
		background-color: var(--admin-accent-0);
		z-index: 1;
		:global(> div) { height: 10rem; }
	}
</style>
