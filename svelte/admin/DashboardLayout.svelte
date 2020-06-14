<main class="content-view">
	<div class="header">
		<h1>StoryLynx Dashboard</h1>
	</div>
	<div class="dashboard">
		<h2 class="full">Project Information</h2>
		<div class="card">
			<h3>Name</h3>
			<p>{process.env.LYNX_SITE_NAME}</p>
			<!-- <h3>Description</h3> -->
		</div>
	</div>
</main>

<!-- <script></script> -->

<style type="text/scss">
	main {
		display: grid;
		// grid-template-areas:
		// 	"header header"
		// 	"main side"
		// ;
		grid-template-rows: auto auto 1fr;
		grid-template-columns: 1fr;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 62rem;
		padding: 18rem 12rem;
		border-bottom: 1px solid var(--admin-accent-2);
	}
	.dashboard {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20rem;
		padding: 20rem;
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
