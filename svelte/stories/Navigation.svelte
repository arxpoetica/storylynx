<svelte:window on:resize={set_widths}/>

<nav bind:this={nav} on:wheel={faff} class:scrolling>
	<!-- {JSON.stringify($page.params)} -->
	<ul bind:this={seq} class="sequences" style="transform:translateX(-{pos_x}px);">
		{#each navigation.sequences as sequence, index}
			<li class="sequence sequence-{index}">
				<h2><a href={href(sequence)}>{sequence.title}</a></h2>
				{#if sequence.clips.length}
					<ul class="clips">
						{#each sequence.clips as clip}
							{#if clip.title}
								<li class="clip">
									<h3><span class="out"><span class="in">{clip.title}</span></span></h3>
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
	import { onMount, getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { page } = get_sapper_stores()

	export let story
	$: navigation = story.rootclip

	function href(sequence) {
		return `/stories/${$page.params.story}/${sequence.title.toLowerCase()}`
	}

	// scrolling helpers:

	// SEE: https://stackoverflow.com/questions/41740082/scroll-events-requestanimationframe-vs-requestidlecallback-vs-passive-event-lis
	// NOTE: `passive: true` is not really needed, but info on it anyway... 🐃
	// SEE: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	// TODO: add `touchmove` ???

	let nav
	let seq
	let pos_x = 0
	let delta_x = 0
	let prev_delta_x = 0
	let ticking = false

	let nav_width = 0
	let seq_width = 0
	let body_width = 0
	$: scrolling = body_width < seq_width

	onMount(() => set_widths())

	function set_widths() {
		nav_width = nav.getBoundingClientRect().width
		seq_width = seq.getBoundingClientRect().width
		body_width =  document.body.getBoundingClientRect().width
		pos_x = set_boundaries(pos_x)
	}

	function set_boundaries(pos) {
		if (pos < 0) {
			pos = 0
		} else if (pos > seq_width - nav_width) {
			pos = Math.floor(seq_width - nav_width)
		}
		return pos
	}

	function faff(event) {
		if (scrolling) {
			event.preventDefault()
			prev_delta_x = event.deltaX
			if (!ticking) {
				requestAnimationFrame(() => {
					delta_x = event.deltaX
					let new_pos_x = pos_x + event.deltaX
					new_pos_x = set_boundaries(new_pos_x)
					pos_x = new_pos_x
					ticking = false
				})
				ticking = true
			}
		}
	}
</script>

<style type="text/scss">
	nav {
		display: flex;
		justify-content: center;
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: black;
		color: white;
		z-index: 1;
		&.scrolling {
			justify-content: flex-start;
		}
	}
	.sequences {
		display: flex;
		transform:translateX(0px);
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
			.out {
				transition: opacity 0.25s ease-in-out;
				opacity: 1;
			}
		}
	}
	h3 {
		width: 4rem;
		height: 20rem;
		margin: 0;
		background-color: blue;
		pointer-events: none;
	}
	.out {
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
	// .in {}
</style>
