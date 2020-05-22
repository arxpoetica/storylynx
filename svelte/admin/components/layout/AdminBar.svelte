<!-- {#if $session.user.role}{/if} -->
<nav class="admin-bar">
	<div class="top">
		<h2>
			<div class="icon"><SettingsIcon/></div>
			Account
		</h2>
		<nav class="links">
			<a href="/" class="link">
				{process.env.LYNX_SITE_NAME} Homepage
				<div class="icon"><HomeIcon/></div>
			</a>
			<div class="divider"></div>
			<a href="/admin" class="link" class:on={on($page.path, 'dashboard')}>StoryLynx Dashboard</a>
			<div class="divider"></div>
			<a href="/admin/users" class="link" class:on={on($page.path, 'users')}>
				Users
				<div class="icon"><UsersIcon/></div>
			</a>
			<a href="/admin/users/{$session.user.username}" class="link">My Profile</a>
		</nav>
		<h2>
			<div class="icon"><ContentIcon/></div>
			Content
		</h2>
		<nav class="links">
			<!-- <a href="/admin/media" class="link" class:on={on($page.path, 'media')}>
				Media
				<div class="icon"><MediaIcon/></div>
			</a> -->
			<a href="/admin/posts" class="link" class:on={on($page.path, 'posts')}>
				Posts
				<div class="icon"><PostIcon/></div>
			</a>
			<div class="divider"></div>
			<a href="/admin/assets" class="link" class:on={on($page.path, 'assets')}>
				Archive Assets
				<div class="icon"><ArchiveIcon/></div>
			</a>
			<a href="/admin/quick-entry" class="link" class:on={on($page.path, 'quick-entry')}>
				Archive Quick Entry
				<div class="icon"><KeyboardIcon/></div>
			</a>
			<a href="/admin/quick-arrange" class="link" class:on={on($page.path, 'quick-arrange')}>
				Archive Quick Arrange
				<div class="icon"><ArrangeIcon/></div>
			</a>
			<div class="divider"></div>
			<!-- <div class="group"> -->
				<a href="/admin/stories" class="link" class:on={on($page.path, 'stories')}>
					Stories
					<div class="icon"><StoriesIcon/></div>
				</a>
				<!-- {#if on($page.path, 'stories')}
					<div class="nested">
						...nested...
					</div>
				{/if} -->
			<!-- </div> -->
		</nav>
	</div>
	<div class="bottom">
		<nav class="links">
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

	const on = (path, segment) =>
		(path === '/admin' && segment === 'dashboard') || path.includes(`/admin/${segment}`)

	import { GET } from '../../../../utils/loaders.js'
	import SettingsIcon from '../../../svg/admin-account.svelte'
	import HomeIcon from '../../../svg/admin-home.svelte'
	import UsersIcon from '../../../svg/admin-users.svelte'
	import ContentIcon from '../../../svg/admin-content.svelte'
	import MediaIcon from '../../../svg/admin-media.svelte'
	import PostIcon from '../../../svg/admin-post.svelte'
	import ArchiveIcon from '../../../svg/admin-archive.svelte'
	import KeyboardIcon from '../../../svg/admin-keyboard.svelte'
	import ArrangeIcon from '../../../svg/admin-arrange.svelte'
	import StoriesIcon from '../../../svg/admin-stories.svelte'
	// import HtmlIcon from '../../../svg/admin-html.svelte'

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
		.icon {
			max-width: 20rem;
			height: auto;
			margin: 0 8rem 0 0;
		}
	}
	.links {
		display: flex;
		flex-direction: column;
		padding: 12rem;
	}
	// .group {}
	// .nested {
	// 	padding-left: 20rem;
	// }
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
			// pointer-events: none;
		}
	}
	.icon {
		max-width: 18rem;
		height: 18rem;
		margin: 0 0 0 8rem;
		// color: var(--admin-blue-dusk);
	}
	.divider {
		margin: 5rem 0;
		height: 1px;
		background-color: var(--admin-gray-light);
	}
</style>
