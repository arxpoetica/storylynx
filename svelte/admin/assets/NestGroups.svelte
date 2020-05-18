{#if $groups}
	<div class="groups">
		{#each $groups as group, g_index}
			<div class="group" class:current={$current_group === g_index} on:click={() => select_group(g_index)}>
				<div class="header">
					<h3>{group.title}</h3>
					{#if $current_group === g_index}
						<h4>No assets. Please select some from the left.</h4>
					{/if}
				</div>
				<div class="eggs">
					{#if group.assets.length}
						{#each group.assets as item, index}
							<NestEgg {item} {index} handler={remove_from_group} size="small"/>
						{/each}
					{/if}
				</div>
				{#if $current_group !== g_index}
					<div class="shield"></div>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<script>
	import { assets, current_group, groups, nest_saved } from '../../../stores/admin-store.js'
	import NestEgg from './NestEgg.svelte'

	function select_group(index) {
		$current_group = index
	}

	function remove_from_group(item, index) {
		$groups[$current_group].assets.splice(index, 1)
		$groups = $groups
		$assets = [...$assets, item]
		$assets.sort((one, two) => one.filename.localeCompare(two.filename))
		$assets = $assets
		$nest_saved = false
	}
</script>

<style type="text/scss">
	// .groups {}
	.header {
		margin: 0 0 20rem;
	}
	h3 {
		font: bold 14rem/1 var(--admin-font);
	}
	h4 {
		margin: 8rem 0 0;
		font: 13rem/1 var(--admin-font);
	}
	.shield {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		border-radius: 20rem;
		cursor: pointer;
	}
	.group {
		position: relative;
		padding: 20rem;
		margin: 0 0 10rem;
		background-color: var(--admin-blue-faint);
		border: 1rem solid var(--admin-blue-lighter);
		border-radius: 20rem;
		&:after {
			content: 'Click to select';
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: -1rem;
			right: -1rem;
			bottom: -1rem;
			left: -1rem;
			background-color: rgba(255, 255, 255, 0.9);
			border-radius: 17rem;
			opacity: 0;
			pointer-events: none;
		}
		&:hover {
			background-color: var(--admin-blue-light);
			border: 1rem solid var(--admin-blue-dark);
			&:after {
				opacity: 1;
			}
		}
		&.current {
			background-color: var(--admin-blue);
			border: 1rem solid var(--admin-blue-dark);
			color: white;
			&:after { display: none; }
		}
	}
	.eggs {
		display: grid;
		grid-template-columns: repeat(auto-fit, 75rem);
		grid-gap: 10rem;
	}
</style>
