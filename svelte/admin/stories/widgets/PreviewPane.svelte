<iframe
	bind:this={iframe}
	src="/admin-preview/{sequence.story.slug.toLowerCase()}/{sequence.slug.toLowerCase()}"
	frameborder="0"
	title="clip preview"
>
</iframe>
{#if !$preview_clip}
	<h2 class="shield">Select a clip on the left to edit.</h2>
{/if}

<script>
	export let sequence
	let iframe

	import { preview_clip } from '../../../../stores/admin-store.js'

	import { getContext } from 'svelte'
	const { get_sapper_stores } = getContext('@sapper/app')
	const { session } = get_sapper_stores()
	import { POST } from '../../../../utils/loaders.js'
	$: if ($preview_clip) { load() }
	async function load() {
		const { story } = await POST('/api/admin/stories/sequence-preview.post', {
			cookie: $session.cookie,
			title: sequence.story.slug.toLowerCase(),
			slug: sequence.slug.toLowerCase(),
			clip_id: $preview_clip.id,
		})
		iframe.contentWindow.i_sequence.set(story.sequence)
		iframe.contentWindow.i_clip_id.set($preview_clip.id)
	}
</script>

<style type="text/scss">
	iframe {
		position: relative;
		height: 100%;
		width: 100%;
	}
	.shield {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: 0;
		padding: 20rem;
		background-color: var(--admin-bg);
	}
</style>
