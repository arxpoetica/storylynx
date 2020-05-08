<!-- {#if $session.user.role}{/if} -->
<nav class="admin-bar">
	<div class="top">
		<h2>
			<div class="icon"><ContentIcon/></div>
			Content
		</h2>
		<nav class="links">
			<a href="/admin/posts" class="link" class:on={path === '/admin/posts'}>
				Posts
				<div class="icon"><PostIcon/></div>
			</a>
			<a href="/admin/assets" class="link" class:on={path === '/admin/assets'}>
				Archive Assets
				<div class="icon"><AssetIcon/></div>
			</a>
			<a href="/admin/media" class="link" class:on={path === '/admin/media'}>
				Media
				<div class="icon"><MediaIcon/></div>
			</a>
		</nav>
	</div>
	<div class="bottom">
		<h2>
			<div class="icon"><Settings/></div>
			Settings
		</h2>
		<nav class="links">
			<a href="/admin/users" class="link" class:on={path === '/admin/users'}>
				Users
			</a>
			<a href="/admin/users/{$session.user.username}" class="link">
				Your Profile
			</a>
			<div class="divider"></div>
			<a href="/auth/logout" class="link" on:click={logout}>
				Log Out
			</a>
		</nav>
	</div>
</nav>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session, page } = get_sapper_stores()

	$: path = $page.path

	import { GET } from '../../../../utils/loaders.js'
	import ContentIcon from '../../../svg/admin-content.svelte'
	import Settings from '../../../svg/admin-settings.svelte'
	import PostIcon from '../../../svg/admin-post.svelte'
	import AssetIcon from '../../../svg/admin-asset.svelte'
	import MediaIcon from '../../../svg/admin-media.svelte'

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
		border-right: 1rem solid var(--admin-gray-light);
		color: var(--admin-text);
		font: 15rem/1 var(--admin-font);
		user-select: none;
	}
	.top,
	.bottom {
		display: flex;
		flex-direction: column;
	}
	h2 {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 10rem;
		font: 20rem/1 var(--admin-font);
		background-color: var(--admin-blue-faint);
		color: var(--admin-blue-dusk);
		cursor: default;
	}
	.links {
		display: flex;
		flex-direction: column;
		padding: 12rem;
	}
	.link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1rem 0;
		padding: 4rem 6rem;
		border-radius: 4rem;
		color: var(--admin-text);
		text-decoration: none;
		transition: none;
		&:hover {
			background-color: var(--admin-gray-lighter);
			transition: background-color 0.15s ease-in-out;
		}
		&.on {
			background-color: var(--admin-blue-faint);
			color: var(--admin-blue-dark);
			font-weight: bold;
			pointer-events: none;
		}
	}
	.icon {
		flex-basis: 18rem;
		margin: 0 8rem 0 0;
	}
	.divider {
		margin: 5rem 0;
		height: 1px;
		background-color: var(--admin-gray-light);
	}
</style>
