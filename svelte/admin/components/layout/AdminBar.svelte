<!-- {#if $session.user.role}{/if} -->
<nav class="admin-bar">
	<div class="top">
		<h2>Account</h2>
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
		<h2>Content</h2>
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
		<h2>
			<!-- <div class="icon"><SettingsIcon/></div> -->
			Settings
		</h2>
		<nav class="links">
			<button class="link scheme-{$color_scheme}" on:click={toggle_color_scheme}>
				<span class="scheme-text"></span>
				<span class="icon scheme-sun"><SunIcon/></span>
				<span class="icon scheme-moon"><MoonIcon/></span>
				<span class="ghost">Toggle Color Mode</span>
			</button>
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
	import HomeIcon from '../../../svg/admin-home.svelte'
	import UsersIcon from '../../../svg/admin-users.svelte'
	// import ContentIcon from '../../../svg/admin-content.svelte'
	import MediaIcon from '../../../svg/admin-media.svelte'
	import PostIcon from '../../../svg/admin-post.svelte'
	import ArchiveIcon from '../../../svg/admin-archive.svelte'
	import KeyboardIcon from '../../../svg/admin-keyboard.svelte'
	import ArrangeIcon from '../../../svg/admin-arrange.svelte'
	import StoriesIcon from '../../../svg/admin-stories.svelte'
	// import SettingsIcon from '../../../svg/admin-account.svelte'
	import SunIcon from '../../../svg/admin-sun.svelte'
	import MoonIcon from '../../../svg/admin-moon.svelte'
	// import HtmlIcon from '../../../svg/admin-html.svelte'

	import { color_scheme } from '../../../../stores/app-store.js'
	function toggle_color_scheme() {
		$color_scheme = $color_scheme === 'auto' ? 'dark' : ($color_scheme === 'dark' ? 'light' : 'auto')
	}


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
		border-right: 1rem solid var(--admin-accent-2);
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
		background-color: var(--admin-color-1);
		color: var(--admin-color-10);
		cursor: default;
		// .icon {
		// 	max-width: 20rem;
		// 	height: auto;
		// 	margin: 0 8rem 0 0;
		// }
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
		background-color: transparent;
		border: none;
		outline: none;
		border-radius: 4rem;
		color: var(--admin-text);
		text-decoration: none;
		cursor: pointer;
		transition: none;
		&:hover {
			background-color: var(--admin-accent-1);
			transition: background-color 0.15s ease-in-out;
		}
		&.on {
			background-color: var(--admin-color-1);
			color: var(--admin-color-8);
			font-weight: bold;
			// pointer-events: none;
		}
	}
	.icon {
		max-width: 18rem;
		height: 18rem;
		margin: 0 0 0 8rem;
		// color: var(--admin-color-10);
	}
	.divider {
		margin: 5rem 0;
		height: 1px;
		background-color: var(--admin-accent-2);
	}

	// DEFAULT IS DARK MODE
	.scheme-sun { display: none; }
	.scheme-moon { display: block; }
	.scheme-text::after { content: 'Auto (Dark Mode)'; }
	.scheme-dark {
		.scheme-sun { display: none; }
		.scheme-moon { display: block; }
		.scheme-text::after { content: 'Dark Mode'; }
	}
	.scheme-light {
		.scheme-sun { display: block; }
		.scheme-moon { display: none; }
		.scheme-text::after { content: 'Light Mode'; }
	}
	@media (prefers-color-scheme: light) {
		.scheme-sun { display: block; }
		.scheme-moon { display: none; }
		.scheme-text::after { content: 'Auto (Light Mode)'; }
	}
</style>
