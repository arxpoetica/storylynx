<Scaffolding>
	<div class="dashboard">
		<h2 class="full">Project Information</h2>
		<div class="card">
			<h3>Name</h3>
			<p>{process.env.LYNX_SITE_NAME}</p>
			<!-- <h3>Description</h3> -->
		</div>
	</div>
</Scaffolding>

<!-- <h1 slot="title">StoryLynx Dashboard</h1> -->


<script>
	import Scaffolding from './components/layout/Scaffolding.svelte'
</script>

<style type="text/scss">
	.dashboard {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20rem;
	}
	h2 {
		margin: 0;
	}
	.full {
		grid-column: 1 / 3;
	}
	.card {
		padding: 20rem;
		border: 1rem solid var(--admin-accent-2);
	}
</style>
