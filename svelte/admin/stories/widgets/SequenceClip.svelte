<div
	bind:this={elem}
	id="{clip.id}_{index}"
	class="clip"
	class:open={$visible_bins[$seq.id].has(clip.id)}
	class:selected
	class:saveable

	draggable={!$preview_clip}
	on:dragstart={event => dragstart(event)}
	on:dragover={event => dragover(event)}
	on:dragend={event => dragend(event)}
	class:draggable={!$preview_clip}
	class:dragging
>
	<div class="header">
		<h2 on:click={() => toggle(clip.id)}>
			<span class="svg"><Caret/></span>
			<span class="texts">
				{clip.slug}
				<!-- <span class="order">({clip.order})</span> -->
				<span class="order">({clip.id})</span>
			</span>
		</h2>
		<div class="actions" class:open>
			<div class="primary">
				{#if selected}
					<Button title={saveable ? 'Cancel' : 'Close'} classes="warn" handler={cancel}/>
					<Button title="Save" classes="good" handler={save} disabled={!saveable}/>
				{:else}
					<Button title="Edit" classes="dark" handler={edit}/>
				{/if}
			</div>
			<div class="secondary" on:click|stopPropagation={() => {}}>
				<button class="reveal" on:click={() => open = !open}><PostIcon/></button>
				<div class="dropdown">
					<Button title="Duplicate" classes="blank plain" handler={() => $handlers.duplicate(index)}/>
					<Button title="Delete" classes="alert blank" handler={() => $handlers.delete(index)}/>
				</div>
			</div>
		</div>
	</div>
	{#if selected}
		<SequenceForm/>
	{:else}
		<AssetBins {clip} selectedclip={selected}/>
	{/if}
</div>

<script>
	export let clip
	export let index

	import Button from '../../components/elements/Button.svelte'
	import Caret from '../../../svg/select-caret.svelte'
	import PostIcon from '../../../svg/admin-post.svelte'
	import SequenceForm from './SequenceForm.svelte'
	import AssetBins from './AssetBins.svelte'

	import {
		target,
		seq,
		seq_order,
		drag_elem,
		swap_elem,
		insert_before,
		visible_bins,
		handlers,
		preview_clip,
		messenger,
		// saveable,
	} from '../../../../stores/admin-store.js'
	import { POST } from '../../../../utils/loaders.js'

	let open = false
	// FIXME: this works, but it's inneffecient. It gets called on EVERY CLIP.
	$: if ($target) {
		open = false
	}

	$: selected = $preview_clip && $preview_clip.id === clip.id
	$: clip_string = selected && JSON.stringify(clip)
	$: preview_string = selected && JSON.stringify($preview_clip)
	$: saveable = selected && clip_string !== preview_string
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

	function dragstart(event) {
		dragging = true
		$drag_elem = elem
		event.dataTransfer.effectAllowed = 'move'
		event.dataTransfer.setData('text/html', $drag_elem.outerHTML)
	}

	function dragover(event) {
		event.preventDefault()
		event.dataTransfer.dropEffect = 'move'
		const { currentTarget: target, clientY } = event
		if (target !== $drag_elem) {
			const { top, bottom } = target.getBoundingClientRect()
			$insert_before = (clientY - top) / (bottom - top) < 0.5

			if ($insert_before) {
				target.parentNode.insertBefore($drag_elem, target)
			} else {
				target.parentNode.insertBefore(target, $drag_elem)
			}
			$swap_elem = target
		}
	}

	async function dragend(event) {
		const parent = event.currentTarget.parentNode

		const clip_changes = [...parent.children].map((child, child_index) => {
			let [id, index] = child.id.split('_')
			if (child_index === parseInt(index)) { return false }
			return { id, order: child_index }
		}).filter(Boolean)

		if (clip_changes.length) {
			const res = await POST('/api/admin/stories/clips-reorder.post', { clip_changes })

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
				const found = clip_changes.find(change => change.id === clip.id)
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
		&.selected {
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
		.order {
			font: 12rem/1.2 var(--admin-font);
			white-space: nowrap;
			opacity: 0.5;
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
