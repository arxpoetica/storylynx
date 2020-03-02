<nav>
	<!-- {JSON.stringify(navigation)} -->
	<ul class="sequences">
		{#each navigation.sequences as sequence, index}
			<li class="sequence">
				<h2><a href="/stories/{$page.params.title}/">{sequence.title || index}</a></h2>
				{#if sequence.clips.length}
					<ul class="clips">
						{#each sequence.clips as clip}
							{#if clip.title}
								<li class="clip">
									<h3><span>{clip.title}</span></h3>
								</li>
							{/if}
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<script>
	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	export let story
	$: navigation = story.rootclip
</script>

<style type="text/scss">
	nav {
		// overflow-x: auto;
		// overflow-y: visible;
		display: flex;
		justify-content: center;
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: black;
		color: white;
	}
	.sequences {
		display: flex;
	}
	.sequence {
		display: flex;
		align-items: center;
	}
	h2 {
		display: flex;
		height: 80rem;
		margin: 0;
		a {
			display: flex;
			align-items: center;
			height: 100%;
			padding: 0 20rem;
			&:hover {
				text-decoration: none;
				background-color: #333;
			}
		}
	}
	.clips {
		display: flex;
		align-items: center;
	}
	.clip {
		display: flex;
		align-items: center;
		position: relative;
		height: 80rem;
		padding: 0 10rem;
		// border-radius: 100%;
		text-align: center;
		cursor: pointer;
		&:hover {
			background-color: #333;
			span {
				transition: opacity 0.25s ease-in-out;
				opacity: 1;
			}
		}
	}
	h3 {
		width: 4rem;
		height: 20rem;
		margin: 0;
		background-color: $red-main;
		pointer-events: none;
	}
	span {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: auto;
		height: 40rem;
		bottom: 100%;
		padding: 10rem;
		background-color: #333;
		color: #eee;
		white-space: nowrap;
		transition: none;
		opacity: 0;
	}
</style>
