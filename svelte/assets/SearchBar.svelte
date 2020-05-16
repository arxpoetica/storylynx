<div class="search-bar" class:highlighted>
	<div class="input-wrap">
		<input
			type="text"
			bind:this={input}
			bind:value={indirect_value}
			on:focus={() => focused = true}
			on:blur={() => focused = false}
			on:keydown={event => enter(event)}
			placeholder="Search"/>
	</div>
	<button class="search" on:click={search}>
		<div class="svg"><Search/></div>
	</button>
</div>
<!-- {$search_term} -->

<script>
	import { search_term } from '../../stores/app-store.js'
	import Search from '../svg/icon-search.svelte'

	let input
	let focused = false
	$: highlighted = focused || indirect_value
	let indirect_value = ''
	$: indirect_value = decodeURIComponent($search_term)

	function enter(event) {
		if (event.key === 'Enter') {
			search()
		}
	}
	function search() {
		search_term.set(encodeURIComponent(indirect_value))
		input.blur()
	}
</script>

<style type="text/scss">
	.search-bar {
		display: flex;
		align-items: center;
		border: 1px solid #afafb1;
		box-shadow:  0 0 2px rgba(0, 0, 0, 0.1);
		&:hover,
		&.highlighted {
			background-color: $white;
			border-color: $black;
			box-shadow: 0 0 2px rgba(30, 140, 190, 0.8);
			outline: 2px solid transparent;
			.svg {
				color: $black;
			}
		}
	}
	.search {
		height: 34rem;
		padding: 0 6rem;
		border: 0;
		cursor: pointer;
	}
	.svg {
		width: 22rem;
		color: #afafb1;
	}
	.input-wrap {
		flex: 1;
	}
	input {
		padding: 0 0 0 10rem;
		height: 34rem;
		width: 100%;
		margin: 0;
		background-color: transparent;
		border: none;
		border-radius: 0;
		box-shadow: none;
		line-height: 34rem;
		font: inherit;
		&:hover,
		&:focus {
			background-color: transparent;
			border: none;
			box-shadow: none;
			outline: none;
		}
	}
</style>
