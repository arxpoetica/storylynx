<div class="content-view">
	<div class="header">
		<h1>{model}</h1>
		<!-- <Button {href} title="Create {singular}"/> -->
	</div>
	<!-- <div class="tools"></div> -->
	<div class="content">
		<div class="col">
			<NestBar items={assets} title="Ungrouped assets"/>
			<Nest items={assets} col="assets"/>
		</div>
		<div class="col">
			<NestBar items={playground} title="Playground assets"/>
			<Nest items={playground} col="playground"/>
		</div>
		<div class="col">
			<NestBar items={groups} title="Grouped assets"/>
			<Nest items={groups} col="groups"/>
		</div>
	</div>
</div>
<slot></slot>

<script>
	export let model = ''
	export let ungrouped_assets = []
	export let grouped_assets = []

	import NestBar from '../../assets/NestBar.svelte'
	import Nest from '../../assets/Nest.svelte'
	// import Button from '../elements/Button.svelte'

	import { assets, playground, groups } from '../../../../stores/admin-store.js'
	import { onMount } from 'svelte'

	onMount(() => {
		assets.set(ungrouped_assets)
		groups.set(grouped_assets)
	})
</script>

<style type="text/scss">
	.content-view {
		display: grid;
		grid-template-rows: auto auto 1fr;
		grid-template-columns: 1fr;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 62rem;
		padding: 12rem;
		border-bottom: 1rem solid var(--admin-gray-light);
	}
	// .tools {
	// }
	.content {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	.col {
		position: relative;
		overflow: auto;
		height: calc(100vh - 62rem);
		padding: 40rem;
		border-right: 1rem solid var(--admin-gray-light);
		&:last-child {
			border: 0;
		}
	}
</style>
