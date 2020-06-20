{#if !$can_autoplay}
	<audio bind:this={audio} muted type="audio/mp3" src="data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV"></audio>
	<div class="autoplay-capture">
		<div class="text">
			<h2>This story is best experienced with headphones.</h2>
			<div class="wire">
				<div class="svg"><StoryAudioPolicy/></div>
			</div>
		</div>
		<button class="button" on:click={() => $can_autoplay = true}>Let's go!</button>
	</div>
{/if}

<script>
	import StoryAudioPolicy from '../../svg/story-audio-policy.svelte'
	import { can_autoplay } from '../../../stores/story-store.js'

	let audio
	import { onMount } from 'svelte'
	onMount(async () => {
		// setTimeout(() => html = document.querySelector('html'), 150)
		try {
			await audio.play()
			$can_autoplay = true
		} catch (error) {} // noop
	})
</script>

<style type="text/scss">
	.autoplay-capture {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.9);
		color: white;
		z-index: 999999999;
		user-select: none;
	}
	h2 {
		margin: 0 0 20rem;
	}
	.wire {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 0 20rem;
		line-height: 0;
		&::before {
			content: '';
			display: block;
			width: calc(100% - 123rem);
			height: 10rem;
			margin-top: -1rem;
			border: 1rem solid white;
		}
	}
	.svg {
		width: 122rem;
		height: 21rem;
	}
	.button {
		background-color: #323335;
		color: white;
		border: none;
		outline: none;
		&:hover,
		&:active {
			background-color: black;
		}
	}
</style>
