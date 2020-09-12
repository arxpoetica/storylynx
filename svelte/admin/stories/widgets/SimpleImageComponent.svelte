<svelte:window on:keydown|capture={event => handle_events(event)}/>

<div class="simple-image-wrapper">
	<div class="search">
		<input
			type="search"
			bind:this={input_search}
			bind:value={search_term}
			placeholder="Search for an image by filename..."
		/>
		<Button title="Search" classes="small" handler={search} bind:element={input_button}/>
	</div>
	<div class="preview" class:on={assets.length}>
		{#if assets.length}
			{#each assets as asset}
				<div class="img">
					<img
						src={`https://media.graphcms.com/output=format:jpg/resize=width:225/${asset.handle}`}
						alt="asdf"
						on:click={() => set_src(asset)}
					/>
				</div>
			{/each}
		{/if}
	</div>
	<div class="inputs">
		<input class="valid" type="hidden" bind:value={loaded}/>
		<input class="src" type="text" bind:value={src} placeholder="Paste an image URL..."/>
		<input class="caption" type="text" bind:value={caption} placeholder="Caption..."/>
		<input class="source" type="text" bind:value={source} placeholder="Source..."/>
	</div>
	<div class="chosen-image" class:on={loaded}>
		<img bind:this={img} {src} alt="No alt." on:load={() => loaded = true}/>
		{#if !loaded}
			<p>No image set.</p>
		{/if}
	</div>
</div>

<script>
	export let src = ''
	export let caption = ''
	export let source = ''
	export let loaded = false

	let input_search
	let input_button

	let img
	let search_term = ''
	let assets = []

	import Button from '../../components/elements/Button.svelte'

	function enter(event) {
	}

	import { POST } from '../../../../utils/loaders.js'
	async function search() {
		const res = await POST('/api/admin/stories/image-search-page.post', { search_term })
		assets = res.assets
	}

	function set_src(asset) {
		src = `https://media.graphcms.com/resize=w:1200/${asset.handle}`
	}

	function handle_events(event) {
		// GROSS PREVENTION OF PROPAGATION!
		if (event.target.closest('.simple-image-wrapper')) {
			event.stopPropagation()
			switch (event.target) {
				case input_search:
				case input_button:
					if (event.key === 'Enter') {
						search()
					}
			}
		}
	}
</script>

<style type="text/scss">
	.search {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		input {
			margin: 0 12rem 0 0;
		}
	}
	.preview {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin: 0 0 10rem;
		&.on {
			grid-gap: 10rem;
			padding: 10rem;
			background-color: var(--admin-color-1);
		}
	}
	.img {
		background-color: white;
		cursor: pointer;
	}
	.chosen-image {
		position: absolute;
		top: -1000rem;
		left: -1000rem;
		opacity: 0;
		pointer-events: none;
		&.on {
			position: static;
			opacity: 1;
		}
	}
</style>

<!-- ARCHIVE_JOHNNY_MILLER_IMG_00059 -->