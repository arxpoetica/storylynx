<div class="toolbar">
	<div class="spread">
		<div class="boxes">
			<div class="box">
				<SelectBox
					title="Content Type"
					store={type}
					primary="All Content Types"
					options={content_types}/>
			</div>
			<div class="box">
				<SelectBox
					title="Decade"
					store={decade}
					primary="All Decades"
					options={decades}/>
			</div>
			<div class="box">
				<SelectBox
					title="Subject"
					store={subject}
					primary="All Subjects"
					options={subjects}/>
			</div>
		</div>
		<div class="search">
			<SearchBar/>
		</div>
	</div>
</div>

<script>
	import { type, decade, subject } from '../../stores/app-store'

	import SelectBox from './SelectBox.svelte'
	import SearchBar from './SearchBar.svelte'

	export let content_types = []
	export let decades = []
	export let subjects = []
</script>

<style type="text/scss">
	.toolbar {
		position: sticky;
		top: 0;
		margin: -100rem -30rem 65rem;
		padding: 25rem 30rem;
		background-color: #d8d8da;
		z-index: 2;
	}
	.spread {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.boxes {
		display: flex;
	}
	.box {
		width: 190rem;
		margin-right: 40rem;
	}
	.search {
		width: 100%;
		max-width: 300rem;
	}
	@media (--medium-down) {
		.spread {
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
		}
		.boxes {
			margin: 0 0 20rem;
		}
		.box {
			width: 200rem;
			&:last-child {
				margin-right: 0;
			}
		}
		.search {
			max-width: 680rem;
		}
	}
	@media (--small-down) {
		.toolbar {
			margin: -40rem -20rem 65rem;
		}
		.boxes {
			flex-direction: column;
			width: 100%;
		}
		.box {
			width: auto;
			margin: 0 0 20rem;
			&:last-child {
				margin: 0;
			}
		}
		.search {
			max-width: none;
		}
	}
</style>
