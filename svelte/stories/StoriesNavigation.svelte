<nav>
	<ul class="sequences">
	<!-- {JSON.stringify(navigation)} -->
		{#each navigation.sequences as sequence}
			<li class="sequence">
				<h2>{sequence.title || sequence.order}</h2>
				{#if sequence.clips.length}
					<ul class="clips">
						{#each sequence.clips as clip}
							<li class="clip">
								<h3>{clip.title || clip.order}</h3>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<script>
	export let story
	$: navigation = story.rootclip
</script>

<style type="text/scss">
	nav {
		// color: red;
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: white;
	}
	.sequences,
	.sequence {
		display: flex;
	}
	h2 {
		overflow: hidden;
		width: 75rem;
		height: 75rem;
		background-color: black;
		border-radius: 100%;
		color: white;
	}
	.clips {
		display: flex;
	}
	.clip {
		overflow: hidden;
		width: 50rem;
		height: 50rem;
		background-color: red;
		border-radius: 100%;
		color: white;
	}
</style>
