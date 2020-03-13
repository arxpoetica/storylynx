<!-- {#if $session.user.role}{/if} -->
<nav class="admin-bar">
	{#if $session.user}
		<div class="first">
			<h2 class:on={path.indexOf('/admin/articles') === 0}>
				<div class="svg"><Post/></div>
				Posts
			</h2>
			<div class="links">
				<a href="/admin/articles" class:on={path === '/admin/articles'}>All Posts</a>
				<a href="/admin/articles/new" class:on={path === '/admin/articles/new'}>Create Post</a>
				<!-- <a href="/admin/articles/categories">Post Categories</a> -->
				<!-- <a href="/admin/articles/tags">Post Tags</a> -->
			</div>
			<h2 class:on={path.indexOf('/admin/assets') === 0}>
				<div class="svg"><Asset/></div>
				Archive Assets
			</h2>
			<div class="links">
				<a href="/admin/assets" class:on={path === '/admin/assets'}>All Assets</a>
				<a href="/admin/assets/new" class:on={path === '/admin/assets/new'}>Create Asset</a>
				<!-- <a href="/admin/assets/categories">Asset Categories</a> -->
				<!-- <a href="/admin/assets/tags">Asset Tags</a> -->
			</div>
			<!-- <h2 class:on={path.indexOf('/admin/media') === 0}>
				<div class="svg"><Media/></div>
				Media
			</h2>
			<div class="links">
				<a href="/admin/media" class:on={path === '/admin/media'}>All Media</a>
				<a href="/admin/media/upload" class:on={path === '/admin/media/upload'}>Upload Media</a>
			</div> -->
		</div>
		<div class="second">
			<h2 class:on={path.indexOf('/admin/users') === 0}>
				<div class="svg"><Settings/></div>
				Settings
			</h2>
			<div class="links">
				<a href="/admin/users" class:on={path === '/admin/users'}>Users</a>
				<a href="/admin/users/{$session.user.username}">Your User</a>
				<div class="div"></div>
				<a href="/auth/logout" on:click={logout}>Log Out</a>
			</div>
		</div>
	{:else}
		<div class="first">
			<h2>
				<div class="svg"><Settings/></div>
				<a href="/auth/login" class="auth">Log In</a>
			</h2>
		</div>
	{/if}
</nav>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session, page } = get_sapper_stores()

	$: path = $page.path

	import { GET } from '../../utils/loaders.js'
	import Settings from './svg/admin-settings.svelte'
	import Post from './svg/admin-post.svelte'
	import Asset from './svg/admin-asset.svelte'
	import Media from './svg/admin-media.svelte'

	async function logout(event) {
		event.preventDefault()
		await GET('/api/auth/logout.get')
		window.location.reload(true)
	}
</script>

<style type="text/scss">
	.admin-bar {
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 250rem;
		height: 100vh;
		background-color: var(--admin-gray-dark);
		color: var(--admin-gray-light);
		font: 15rem/1 var(--admin-font);
	}
	.first,
	.second {
		display: flex;
		flex-direction: column;
	}
	h2 {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 10rem;
		font: 18rem/1 var(--admin-font);
		background-color: var(--admin-gray-darker);
		color: var(--admin-gray-lighter);
		cursor: default;
		&.on {
			background-color: var(--admin-blue);
			color: var(--admin-black);
		}
	}
	.svg {
		flex-basis: 20rem;
		margin: 0 8rem 0 0;
	}
	.links {
		display: flex;
		flex-direction: column;
		padding: 8rem 6rem;
	}
	a {
		padding: 6rem;
		color: var(--admin-gray-light);
		text-decoration: none;
		transition: none;
		&:hover {
			background-color: var(--admin-gray-dark);
			transition: background-color 0.15s ease-in-out;
		}
		&.on {
			color: var(--admin-blue);
			font-weight: bold;
			pointer-events: none;
		}
	}
	.div {
		margin: 5rem 0;
		height: 1px;
		background-color: var(--admin-black);
	}
</style>
