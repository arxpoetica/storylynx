<div class="layout-main">
	<div class="box">
		<slot name="pre-content"></slot>

		{#if modal}
			<h1>{modal.name}</h1>
			<!-- <p>Modal: {JSON.stringify(modal)}</p> -->
			{#each modal.rootclip.sequences as sequence}
				<div class="sequence {sequence.classes ? sequence.classes : ''}">
					<h2>{sequence.name}</h2>
					{#each sequence.clips as clip}
						<div class="clip {clip.classes ? clip.classes : ''}">
							<h3>{clip.name}</h3>
							<div class="detail">
								{@html clip.html}
							</div>
						</div>
					{/each}
				</div>
			{/each}
		{/if}

		<slot name="post-content"></slot>
	</div>
</div>

<script>
	export let modal

	// import LazyImg from '../LazyImg.svelte'
	// $: asset = modal.assets ? modal.assets[0] : false
	// $: src = asset ? source(asset, { crop: true, height: Math.floor(asset.height / asset.width * 1000), width: 1000 }) : false
	// $: alt = asset ? asset.summary : 'No description for this image.'

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	// $: html = modal.html ? modal.html.replace(/<p><\/p>/gi, '') : ''
</script>

<style type="text/scss">
	.sequence {
		padding: 50rem;
		border: 3px solid black;
	}
	.clip {
		margin: 0 0 50rem;
		padding: 50rem;
		background-color: white;
	}
	.detail {
		& :global {
			> p:first-child::first-letter {
				float: left;
				margin: -6rem 0 0 0;
				padding: 0 12rem 6rem 0;
				// background-color: red;
				font-size: 100rem;
				line-height: 80rem;
			}
			.media {
				width: 100%;
				margin: 50rem 0;
				line-height: 0;
			}
			img,
			video {
				margin: 0;
				width: 100%;
			}
			.media + .source,
			.media + .caption {
				margin: -44rem 0 50rem;
			}
			.media + .source + .caption {
				margin: -48rem 0 50rem;
			}
			.source {
				color: #b2b2b2;
				font: $light 13rem/18rem $font;
			}
			.caption {
				font: $bold 13rem/18rem $font;
				text-transform: uppercase;
			}
			.media,
			.source,
			.caption {
				p {
					margin: 0;
				}
			}
		}
	}
</style>
