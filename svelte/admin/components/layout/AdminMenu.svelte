<svelte:body on:click={event => close_menu(event.target)}/>

<div bind:this={menu} class="menu">
	<div class="icon" on:click={() => open = !open}>
		<SettingsIcon/>
	</div>
	<div class="dropdown" class:open>
		<a href="/" class="link" target="_blank">
			{process.env.LYNX_SITE_NAME} Homepage
			<!-- <div class="icon"><HomeIcon/></div> -->
		</a>
		<div class="divider"></div>
		<a href="/admin/users/{$session.user.username}" class="link">My Profile</a>
		<button class="link scheme-{$color_scheme}" on:click={toggle_color_scheme}>
			<span class="scheme-text"></span>
			<span class="icon scheme-sun"><SunIcon/></span>
			<span class="icon scheme-moon"><MoonIcon/></span>
			<span class="ghost">Toggle Color Mode</span>
		</button>
		<div class="divider"></div>
		<a href="/auth/logout" class="link logout" on:click={logout}>Log Out</a>
	</div>
</div>

<script>
	import { session, color_scheme } from '../../../../stores/app-store.js'

	let menu
	let open = false

	import SettingsIcon from '../../../svg/admin-account.svelte'
	import SunIcon from '../../../svg/admin-sun.svelte'
	import MoonIcon from '../../../svg/admin-moon.svelte'

	function close_menu(target) {
		if (open && target && !menu.contains(target)) {
			open = false
		}
	}

	function toggle_color_scheme() {
		$color_scheme = $color_scheme === 'auto' ? 'dark' : ($color_scheme === 'dark' ? 'light' : 'auto')
	}

	import { GET } from '../../../../utils/loaders.js'
	async function logout(event) {
		event.preventDefault()
		await GET('/api/auth/logout.get')
		window.location.reload(true)
	}
</script>

<style type="text/scss">
	.menu {
		position: relative;
	}
	.dropdown {
		display: none;
		flex-direction: column;
		position: absolute;
		top: calc(100% + 4rem);
		right: 0;
		width: 300rem;
		padding: 8rem 0;
		background-color: var(--admin-accent-1);
		box-shadow: var(--admin-shadow);
		z-index: var(--admin-z-index-top);
		&.open {
			display: flex;
		}
	}
	.link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		padding: 8rem 15rem;
		background-color: transparent;
		border: none;
		outline: none;
		color: var(--admin-text);
		text-decoration: none;
		cursor: pointer;
		transition: none;
		&:hover {
			background-color: var(--admin-accent-0);
			transition: background-color 0.15s ease-in-out;
		}
		&.on {
			background-color: var(--admin-color-1);
			color: var(--admin-color-8);
			font-weight: bold;
			// pointer-events: none;
		}
		.icon {
			max-width: 18rem;
			height: 18rem;
			padding: 0;
		}
	}
	.divider {
		margin: 8rem 0;
		border-bottom: 1rem solid var(--admin-accent-2);
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
