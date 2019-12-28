<header class="layout-outer">
	<div class="layout-inner">
		<a class="logo" href="/">
			<span>{process.env.LYNX_SITE_NAME}</span>
		</a>
		<nav>
			<ul>
				{#each navs as nav}
					<li data-on={section === nav.state}>
						{#if nav.prefetch}
							<a href={nav.href} rel=prefetch>{@html nav.text}</a>
						{:else}
							<a href={nav.href}>{@html nav.text}</a>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<script>
	export let section
	export let navs
	// import { getContext } from 'svelte'
	// const { get_sapper_stores } = getContext('@sapper/app')
	// const { session } = get_sapper_stores()
</script>

<style type="text/scss">
	.layout-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rem;
		padding-bottom: 20rem;
		@media (--medium-down) {
			flex-direction: column;
			justify-content: flex-start;
		}
	}
	.logo {
		text-align: center;
	}
	nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		ul {
			display: flex;
		}
		li {
			margin: 0 36rem 0 0;
			&:last-child { margin: 0; }
			&[data-on=true] a {
				// pointer-events: none;
				&::after { width: 100%; }
			}
		}
		a {
			color: $black;
			text-decoration: none;
			&::before {
				content: '';
				display: block;
				height: 10rem;
			}
			&::after {
				content: '';
				display: block;
				position: relative;
				left: -2rem; // there's a weird positioning issue w/ this font, hence the negative spacing
				width: 0;
				height: 2px;
				margin: 8rem auto 0;
				background-color: $black;
				transition: width 0.3s ease-in-out;
			}
			&:hover::after,
			&:focus::after {
				width: 100%;
			}
		}
	}
	@media (--small) {
		nav {
			li {
				margin: 0 10rem;
				&:last-child { margin: 0 10rem; }
			}
		}
	}
	@media (--smallest) {
		nav {
			ul {
				flex-direction: column;
			}
			li {
				display: flex;
				justify-content: center;
				margin: 0 0 10rem;
				&:last-child { margin: 0; }
			}
		}
	}
</style>
