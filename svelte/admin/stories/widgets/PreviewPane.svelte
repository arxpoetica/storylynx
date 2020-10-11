<iframe
	bind:this={iframe}
	src="/admin-preview/{$seq.story.slug}/{$seq.slug}"
	frameborder="0"
	title="clip preview"
>
</iframe>
{#if !$preview_clip}
	<h2 class="shield">Select a clip on the left to edit.</h2>
{/if}

<script>
	let iframe

	import { seq, preview_clip, messenger } from '../../../../stores/admin-store.js'
	$: $messenger = iframe ? iframe.contentWindow.postMessage : () => {}

	import { POST } from '../../../../utils/loaders.js'

	// NOTE: this little dance is so that it doesn't `load()` every time `$preview_clip` is changed
	let loaded = false
	$: if (!loaded && $preview_clip) { load() }
	$: if (!$preview_clip) { loaded = false }
	async function load() {
		loaded = true
		const { story } = await POST('/api/admin/stories/sequence-preview.post', {
			story_slug: $seq.story.slug,
			sequence_slug: $seq.slug,
			clip_id: $preview_clip.id,
		})
		$messenger({ sequence: story.sequence, clip: $preview_clip })
	}
</script>

<style type="text/scss">
	iframe {
		position: relative;
		height: 100%;
		width: 100%;
	}
	.shield {
		display: flex;
		justify-content: center;
		align-items: center;
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
