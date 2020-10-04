<div
	bind:this={elem}
	id="{clip.id}_{index}_{clip.order}"
	class="clip"
	class:open={$visible_bins[$seq.id].has(clip.id)}
	class:editing
	class:saveable

	{draggable}
	on:dragstart={event => dragging = dragstart(event, elem, !draggable)}
	on:dragover={event => dragover(event, elem, !draggable)}
	on:dragend={dragend}
	class:draggable
	class:dragging
>
	<div class="header">
		<h2 on:click={() => toggle(clip.id)}>
			<span class="svg"><Caret/></span>
			<span class="texts">
				{clip.slug}
				<!-- <span class="order">({clip.order})</span> -->
				<!-- <span class="order">({clip.id})</span> -->
			</span>
		</h2>
		<div class="actions" class:open>
			<div class="primary">
				{#if editing}
					<Button label={saveable ? 'Cancel' : 'Close'} classes="warn" handler={cancel}/>
					<Button label="Save" classes="good" handler={save} disabled={!saveable}/>
				{:else}
					<Button label="Edit" classes="dark" handler={edit}/>
				{/if}
			</div>
			<div class="secondary" on:click|stopPropagation={() => {}}>
				<button class="reveal" on:click={() => open = !open}><PostIcon/></button>
				<div class="dropdown">
					<Button label="Duplicate" classes="blank plain" handler={() => $handlers.duplicate_clip(index)}/>
					<Button label="Delete" classes="alert blank" handler={() => $handlers.delete_clip(index)}/>
				</div>
			</div>
		</div>
	</div>
	{#if $visible_bins[$seq.id].has(clip.id) || editing}
		<div class="body">
			{#if editing}
				<SequenceForm/>
				<div class="bins">
					<!-- order: 1 -->
					{#each $preview_clip.asset_bins as bin, bin_index (bin.id)}
						<AssetBinForm bind:bin clip_index={index} {bin_index} />
					{/each}
				</div>
			{:else}
				<AssetBins {clip} selectedclip={editing}/>
				<!-- {#if bin.html_blocks.length}
					<div class="html-blocks">
						<h3>HTML Blocks</h3>
						{#each bin.html_blocks as block, block_index}
							<HtmlBlock bind:block {bin_index} {block_index} {selectedclip}/>
						{/each}
					</div>
				{/if} -->
			{/if}
		</div>
	{/if}
</div>

<script>
	export let clip
	export let index

	import Button from '../../components/elements/Button.svelte'
	import Caret from '../../../svg/select-caret.svelte'
	import PostIcon from '../../../svg/admin-post.svelte'
	import SequenceForm from './SequenceForm.svelte'
	import AssetBinForm from '../assets/AssetBinForm.svelte'
	import AssetBins from '../assets/AssetBins.svelte'

	import {
		target,
		seq,
		drag_elem,
		visible_bins,
		handlers,
		preview_clip,
		messenger,
	} from '../../../../stores/admin-store.js'
	import { POST } from '../../../../utils/loaders.js'

	let open = false
	// FIXME: this works, but it's inneffecient. It gets called on EVERY CLIP.
	$: if ($target) {
		open = false
	}

	$: editing = $preview_clip && $preview_clip.id === clip.id
	$: clip_string = editing && JSON.stringify(clip)
	$: preview_string = editing && JSON.stringify($preview_clip)
	$: saveable = editing && clip_string !== preview_string
	$: if (preview_string) {
		$messenger({ clip: $preview_clip })
	}

	function toggle(id) {
		if ($visible_bins[$seq.id].has(id)) {
			$visible_bins[$seq.id].delete(id)
		} else {
			$visible_bins[$seq.id].add(id)
		}
		$visible_bins = $visible_bins
	}
	async function edit() {
		// MORE TODO: !!!!!
		cancel()
		setTimeout(() => $preview_clip = JSON.parse(JSON.stringify($seq.clips[index])), 0)
	}
	async function cancel() {
		// MORE TODO: !!!!!
		$preview_clip = undefined
		preview_string = ''
	}
	async function save() {
		await POST('/api/admin/stories/clip-update.post', { clip: $preview_clip })
		$seq.clips[index] = $preview_clip
	}

	let elem
	let dragging = false
	$: draggable = !$preview_clip

	import { dragstart, dragover, get_changes } from '../../../../utils/story-utils.js'

	async function dragend() {
		if (!draggable) { return }

		const changes = get_changes(elem)

		if (changes.length) {
			const res = await POST('/api/admin/stories/clips-reorder.post', { clip_changes: changes })

			if (res.error) {
				alert('Something went wrong. Resetting clip order. Please contact the administrator of this site for assistance.')
				const reset_clips = [...$seq.clips]
				$seq.clips = []
				setTimeout(() => $seq.clips = reset_clips, 0)
				$drag_elem = undefined
				dragging = false
				return false
			}

			$seq.clips = $seq.clips.map(clip => {
				const found = changes.find(change => change.id === clip.id)
				if (found) { clip.order = found.order }
				return clip
			}).sort((one, two) => one.order - two.order)
		}

		$drag_elem = undefined
		dragging = false
	}
</script>

<style type="text/scss">
	.clip {
		display: flow-root;
		margin: 0 0 20rem;
		padding: 20rem 20rem 0;
		background-color: var(--admin-accent-1);
		border-radius: 15rem;
		&:last-child { margin: 0; }
		&:hover .actions { opacity: 0.75; }
		&.open h2 .svg { transform: rotate(360deg); }
		&.editing {
			box-shadow: var(--admin-form-shadow);
			.actions { opacity: 1; }
		}
		&.saveable {
			box-shadow: 0 0 0 3rem var(--admin-warn);
			.secondary { display: none; }
		}
		&.draggable {
			cursor: pointer;
			user-select: none;
		}
		&.dragging {
			box-shadow: inset 0 0 0 3rem var(--admin-accent-2);
			opacity: 0.25;
		}
		// THIS IS FOR THE FORMS
		:global {
			.rows {
				display: grid;
				grid-template-columns: 1fr;
				grid-gap: 20rem;
			}
			.row {
				display: grid;
				align-items: flex-start;
				grid-template-columns: 2fr 1fr;
				grid-column-gap: 20rem;
				max-width: var(--admin-panel-width);
				&.full { grid-template-columns: 1fr; }
				&.split {
					grid-template-columns: 1fr 1fr;
					.checkbox { margin-top: 22rem; }
				}
				&.fives {
					grid-template-columns: repeat(5, 1fr);
					.checkbox { margin-top: 22rem; }
				}
			}
		}
	}
	.header {
		display: flex;
		margin: 0 0 20rem;
	}
	h2 {
		display: flex;
		align-items: center;
		flex: 1;
		min-width: 0;
		margin: 0 20rem 0 0;
		font: bold 14rem/1 var(--admin-font);
		cursor: pointer;
		user-select: none;
		.texts {
			margin: 0 0 0 5rem;
		}
		.svg {
			min-width: 12rem;
			max-width: 12rem;
			height: 6rem;
			transform: rotate(270deg);
			line-height: 0;
		}
	}
	.actions {
		display: flex;
		align-items: center;
		opacity: 0;
		&.open {
			opacity: 1;
			.dropdown { display: block; }
		}
	}
	.primary {
		display: flex;
		:global(.button) {
			margin: 0 0 0 10rem;
			&:first-child { margin: 0; }
		}
	}
	.secondary {
		position: relative;
		display: flex;
		margin: 0 0 0 10rem;
		:global(.button) {
			margin: 10rem 0 0;
			&:first-child { margin: 0; }
		}
	}
	.reveal {
		width: 34rem;
		height: 34rem;
		margin: 0;
		padding: 0;
		padding: 8rem;
		background-color: var(--admin-bg);
		border: 0;
		border-radius: 100%;
		line-height: 0;
		color: var(--admin-accent-4);
		transition: all 0.15s ease-in-out;
		cursor: pointer;
		-webkit-appearance: none;
		user-select: none;
		&:hover,
		.actions.open & {
			background-color: var(--admin-accent-0);
		}
		&:focus {
			outline: none;
			box-shadow: var(--admin-form-shadow);
		}
	}
	.dropdown {
		display: none;
		position: absolute;
		top: calc(100% + 8rem);
		right: 0;
		padding: 10rem;
		border-radius: 5rem;
		background-color: var(--admin-accent-0);
		z-index: 1;
	}
</style>
