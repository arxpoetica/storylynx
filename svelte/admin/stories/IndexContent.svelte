<Scaffolding title="Stories">
	<div class="selector">
		<div class="col">
			<div class="stories">
				{#each stories as story, index}
 					<div class="story {selected === index ? 'good' : ''}" on:click={() => selected = index}>
						{story.title}
					</div>
				{/each}
			</div>
		</div>
		{#if selected > -1}
			<div class="col">
				<div class="thumbs sequences">
					{#each stories[selected].sequences as seq}
						<div class="thumb">
							<a href="/admin/stories/{stories[selected].id}/{seq.id}" style={bg(seq)}>{seq.slug}</a>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</Scaffolding>

<script>
	export let stories = []
	let selected = 0

	import Scaffolding from '../components/layout/Scaffolding.svelte'

	function bg(seq) {
		let bg = ''
		if (seq.asset) {
			bg += 'background-image:url('
			bg += `https://media.graphcms.com/resize=w:600,h:600,fit:crop/${seq.asset.handle}`
			bg += ');'
			return bg
		}
		return false
	}
</script>

<style type="text/scss">
	.selector {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 20rem;
		color: var(--admin-text);
		font: bold 22rem/1 var(--admin-font);
		text-transform: uppercase;
		text-shadow: var(--admin-text-shadow);
	}
	// .col {}
	.stories {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 20rem;
	}
	.story {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15rem;
		background-color: var(--admin-accent-1);
		border-radius: 6rem;
		cursor: pointer;
		&:hover {
			background-color: var(--admin-color-1);
		}
	}
	.thumbs {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: repeat(auto-fill, 1fr);
		grid-gap: 20rem;
	}
	.thumb {
		position: relative;
		padding: 0 0 100%;
		background-color: var(--admin-accent-1);
		border-radius: 6rem;
		&:hover {
			background-color: var(--admin-color-1);
		}
		a {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 8rem;
			right: 8rem;
			bottom: 8rem;
			left: 8rem;
			background: none no-repeat center transparent;
			background-size: cover;
			border-radius: 4rem;
			color: var(--admin-text);
			text-decoration: none;
		}
	}
</style>
