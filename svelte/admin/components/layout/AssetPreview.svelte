<svelte:window on:keydown={event => escape(event)}/>

{#if $egg_preview}
	<div class="asset-preview">
		<div class="under" on:click={() => $egg_preview = null}></div>
		<div class="over">
			<h2>{$egg_preview.filename}</h2>
			{#if $egg_preview.mime_type.includes('image')}
				<img {src} alt={$egg_preview.filename}/>
			{:else if $egg_preview.mime_type.includes('video')}
				<video controls>
					<source {src} type={$egg_preview.mime_type}/>
				</video>
			{:else if $egg_preview.mime_type.includes('audio')}
				<audio controls>
					<source {src} type={$egg_preview.mime_type}/>
				</audio>
			{:else}
				<h2 class="description">
					{$egg_preview.mime_type}
				</h2>
			{/if}
			<div class="close" on:click={() => $egg_preview = null}><Close/></div>
		</div>
	</div>
{/if}

<script>
	import { egg_preview } from '../../../../stores/admin-store.js'
	import Close from '../../../svg/admin-close.svelte'
	$: src = $egg_preview ? `https://media.graphcms.com/${$egg_preview.handle}` : ''

	function escape(event) {
		if ($egg_preview && event.key === 'Escape') {
			$egg_preview = null
		}
	}
</script>

<style type="text/scss">
	.asset-preview {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		z-index: 100;
	}
	.under,
	.over {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.over {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rem;
		pointer-events: none;
		> * {
			pointer-events: all;
		}
	}
	h2 {
		margin: 0 0 20rem;
		font: 30rem/1 var(--admin-font);
	}
	img, video {
		max-height: calc(100vh - 200rem);
	}
	.close {
		position: absolute;
		top: 20rem;
		right: 20rem;
		padding: 20rem;
		width: 80rem;
		height: 80rem;
		cursor: pointer;
	}
</style>
