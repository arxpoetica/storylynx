<!-- <p>{JSON.stringify(item)}</p> -->

<div class="post">
	<a href="/posts/{item.slug}" rel=prefetch>
		<div class="img">
			<LazyImg {src} {alt}/>
		</div>
		<h2>{item.headline}</h2>
	</a>
	<div class="detail">
		<h3>{formattedstamp(item.published)}</h3>
		{#if item.subheadline}
			<p class="subheadline">{item.subheadline}</p>
		{/if}
		<Tags url="/posts" tags={item.tags}/>
	</div>
</div>

<script>
	import { formattedstamp, src as source } from '../../utils/basic-utils'
	import LazyImg from '../LazyImg.svelte'
	import Tags from '../Tags.svelte'
	export let item

	$: asset = item.assets ? item.assets[0] : false
	$: src = asset ? source(asset, { crop: true }) : false
	$: alt = asset ? asset.caption : 'No description for this image.'
</script>

<style type="text/scss">
	.post {
		// margin: 0 0 50rem;
		padding: 35rem;
		border: 1px solid transparent;
		color: $black;
		font: 13rem/16rem $font;
		text-align: center;
		transition: border-color 0.15s ease-in-out;
		&:hover {
			border-color: #cdccd0;
			a {
				text-decoration: none;
			}
		}
	}
	a {
		color: $black;
	}
	.img {
		margin: 0 0 25rem;
	}
	h2 {
		margin: 0;
		padding: 0 30rem;
		&:after {
			content: '';
			display: block;
			width: 15rem;
			height: 2rem;
			margin: 10rem auto;
			background-color: #b5b5b5;
		}
	}
	.detail {
		padding: 0 30rem;
	}
	h3 {
		margin: 0 0 20rem;
	}
	h2,
	h3 {
		font: $bold 13rem/16rem $font;
		letter-spacing: 2.4rem;
		text-transform: uppercase;
	}
	.subheadline {
		margin: 0 0 15rem;
	}
	@media (--small-down) {
		.post {
			margin: 0 0 75rem;
			padding: 0;
			&:hover {
				border-color: transparent;
			}
		}
	}
</style>
