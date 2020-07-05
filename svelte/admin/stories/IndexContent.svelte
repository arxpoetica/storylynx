<Scaffolding title="Stories">
	<div class="selector">
		<div class="col">
			<h2 class="h3">Select a Story</h2>
			<div class="stories">
				{#each stories as story, index}
					<Button
						title={story.title}
						classes="block {selected === index ? 'good' : ''}"
						handler={() => selected = index}
					/>
				{/each}
			</div>
		</div>
		{#if selected > -1}
			<div class="col">
				<h2 class="h3">Select a Sequence</h2>
				<div class="sequences">
					{#each stories[selected].sequences as seq}
						<Button href="/admin/stories/{stories[selected].id}/{seq.id}" title={seq.slug} classes="block"/>
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
	import Button from '../components/elements/Button.svelte'
</script>

<style type="text/scss">
	.selector {
		display: flex;
	}
	.col {
		width: 300rem;
		margin: 0 0 0 20rem;
		padding: 0 0 0 20rem;
		border-left: 1rem solid var(--admin-accent-2);
		&:first-child {
			margin: 0;
			padding: 0;
			border: 0;
		}
	}
</style>
