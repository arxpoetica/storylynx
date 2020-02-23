<div class="layout-main">
	<div class="box">
		<slot name="pre-content"></slot>

		{#if modal}
			<!-- <h1>{modal.name}</h1> -->
			<!-- <p>Modal: {JSON.stringify(modal)}</p> -->
			{#each modal.rootclip.sequences as sequence}
				<div class="sequence {sequence.classes ? sequence.classes : ''}">
					<!-- {#if sequence.name || sequence.html}
						<div class="sequence-header">
							<div class="detail">
								{#if sequence.name}
									<h2>{sequence.name}</h2>
								{/if}
								{#if sequence.html}
									{@html html(sequence.html)}
								{/if}
							</div>
						</div>
					{/if} -->
					<div class="clips">
						{#each sequence.clips as clip}
							<Clip {clip}/>
						{/each}
					</div>
				</div>
			{/each}
		{/if}

		<slot name="post-content"></slot>
	</div>
</div>

<script>
	export let modal
	import Clip from './Clip.svelte'

	// FIXME: ????? CAN I EVEN???
	// THIS IS GROSS THAT I HAVE TO CLEAN IT UP ON BEHALF OF GRAPHCMS, BUT WHATEVS
	const html = html => html ? html.replace(/<p><\/p>/gi, '') : ''
</script>

<style type="text/scss">
	.sequence {
		padding: 50rem;
		border: 3px solid black;
	}
</style>