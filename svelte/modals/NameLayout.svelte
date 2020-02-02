<div class="layout-main">
	<div class="box">
		<slot name="pre-content"></slot>

		{#if modal}
			<h1>{modal.name}</h1>
			<!-- <p>Modal: {JSON.stringify(modal)}</p> -->
			{#each modal.rootclip.sequences as sequence}
				<div class="sequence">
					<h2>{sequence.name}</h2>
					{#each sequence.clips as clip}
						<div class="clip">
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

<!-- <style type="text/scss"></style> -->
