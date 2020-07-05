<nav class="admin-bar">
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
	<a href="/admin/posts" class="link" class:on={on($page.path, 'posts')}>
		Posts
		<div class="icon"><PostIcon/></div>
	</a>
	<a href="/admin/users" class="link" class:on={on($page.path, 'users')}>
		Users
		<div class="icon"><UsersIcon/></div>
	</a>
</nav>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()
	const on = (path, segment) => path === '/admin' || path.includes(`/admin/${segment}`)

	import { GET } from '../../../../utils/loaders.js'
	import UsersIcon from '../../../svg/admin-users.svelte'
	// import ContentIcon from '../../../svg/admin-content.svelte'
	// import MediaIcon from '../../../svg/admin-media.svelte'
	import PostIcon from '../../../svg/admin-post.svelte'
	import ArchiveIcon from '../../../svg/admin-archive.svelte'
	import KeyboardIcon from '../../../svg/admin-keyboard.svelte'
	import ArrangeIcon from '../../../svg/admin-arrange.svelte'
	import StoriesIcon from '../../../svg/admin-stories.svelte'
	// import HtmlIcon from '../../../svg/admin-html.svelte'
</script>

<style type="text/scss">
	.admin-bar {
		overflow-x: hidden;
		overflow-y: auto;
		grid-area: nav;
		padding: 20rem 0 0;
		color: var(--admin-text);
		font: 15rem/1 var(--admin-font);
		user-select: none;
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
		padding: 12rem 15rem;
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
</style>
