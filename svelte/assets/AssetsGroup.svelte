<!-- <p>{JSON.stringify(asset)}</p> -->

<!-- FIXME: we might need to bring back external assets :( -->
{#if first_asset}
	<a class="asset" href="/assets/{asset_group.slug}">
		<div class="media" on:contextmenu={event => event.preventDefault()}>
			<Asset asset={first_asset} thumb={true}/>
		</div>
		<div class="texts">
			<div class="info">
				<h2>
					{asset_group.title || '[This Asset has no title.]'} 
					{#if asset_group.year}
						<span>({asset_group.year})</span>
					{/if}
				</h2>
				<h3 class="h6">{asset_group.content_type || 'Uncategorized'}</h3>
			</div>
			<h4 class="h6">Explore</h4>
		</div>
	</a>
{/if}

<script>
	import Asset from '../Asset.svelte'
	export let asset_group
	// FIXME: if no asset, then it shouldn't display at all...
	$: first_asset = asset_group.assets.length ? asset_group.assets[0] : false
</script>

<style type="text/scss">
	.asset {
		display: grid;
		grid-template-rows: auto 82rem;
		grid-gap: 35rem;
		padding: 35rem;
		border: 1px solid transparent;
		color: $black;
		transition: border-color 0.15s ease-in-out;
		&:hover {
			border-color: #cdccd0;
			text-decoration: none;
			h4 {
				color: $black;
			}
		}
	}
	.media {
		margin: 0;
		background-color: green;
	}
	.texts {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.info {
		display: flex;
		flex-direction: column-reverse;
	}
	h2 {
		margin: 0;
		font: 15rem/1.2 $font;
		letter-spacing: 0.3rem;
		text-align: center;
		span {
			margin-left: 6rem;
		}
	}
	h3 {
		margin: 0 0 10rem;
		font-weight: $heavy;
		text-align: center;
	}
	h4 {
		margin: 0;
		color: transparent;
		text-align: center;
		transition: color 0.15s ease-in-out;
	}
	@media (--small-down) {
		.asset {
			margin: 0 0 35rem;
			padding: 0;
			&:hover {
				border-color: transparent;
				h4 {
					color: transparent;
				}
			}
		}
	}
</style>
