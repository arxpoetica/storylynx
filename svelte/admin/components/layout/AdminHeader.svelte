<header class="header">
	<div class="band">
		<a href="/admin" class="icon">
			<div class="ghost">StoryLynx Dashboard</div>
			<HomeIcon/>
		</a>
		<AdminMenu/>
	</div>
</header>

<script>
	import AdminMenu from './AdminMenu.svelte'
	import HomeIcon from '../../../svg/admin-home.svelte'
</script>

<style type="text/scss">
	.header {
		padding: 12rem 0;
		background-color: var(--admin-accent-1);
		:global(.icon) {
			max-width: 30rem;
			height: 30rem;
			padding: 6rem;
			cursor: pointer;
			color: inherit;
		}
	}
	.band {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: var(--admin-layout-width);
		margin: 0 auto;
		padding: 0 9rem;
	}
</style>
