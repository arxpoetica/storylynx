<nav class="inline-navigation">
	<ul class="sequences">
		{#each navigation.sequences as sequence, index}
			<li class="sequence sequence-{index}">
				<h2><a href={href(sequence)}>{sequence.title}</a></h2>
			</li>
		{/each}
	</ul>
</nav>

<script>
	import { onMount, getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	export let story
	$: navigation = story.rootclip

	function href(sequence) {
		return `/stories/${$page.params.story}/${sequence.title.toLowerCase()}`
	}
</script>

<style type="text/scss">
	.inline-navigation {
		position: relative;
		background-color: black;
		z-index: 1;
	}
	.sequences {
		display: flex;
		justify-content: center;
	}
	.sequence {
		display: flex;
		align-items: center;
	}
	h2 {
		display: flex;
		height: 80rem;
		margin: 0;
	}
	a {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 20rem;
		color: white;
		&:hover {
			text-decoration: none;
			background-color: #333;
		}
	}
</style>
