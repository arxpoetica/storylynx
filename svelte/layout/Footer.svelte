<footer class="layout-outer">
	<nav class="layout-inner">
		<ul>
			{#if copyright}
				<li><span>{@html copyright}</span></li>
			{/if}
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
		{#if brands.length}
			<ul class="brands">
				{#each brands as brand}
					<li><a href={brand.href} target="_blank">{@html brand.text}</a></li>
				{/each}
			</ul>
		{/if}
		{#if share}
			<Share/>
		{/if}
	</nav>
</footer>

<script>
	import Share from './Share.svelte'
	export let section
	export let copyright
	export let navs
	export let brands
	export let share = false
</script>

<style type="text/scss">
	// footer {
	// }
	.layout-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		padding: 20rem;
	}
	ul {
		display: flex;
		margin: 0 0 20rem;
	}
	li {
		margin: 0 10rem;
	}
	@media (--medium-down) {
		ul {
			flex-direction: column;
		}
		li {
			display: flex;
			justify-content: center;
			text-align: center;
		}
	}
</style>
