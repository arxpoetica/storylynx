<div
	bind:this={elem}
	class="clip"
	class:open={$visible_bins[$seq.id].has(clip.id)}
	class:selected
	class:saveable

	draggable="true"
	on:dragstart={event => dragstart(event)}
	on:dragenter={event => dragenter(event)}
	on:dragover={event => dragover(event)}
	on:dragleave={event => dragleave(event)}
	on:drop={event => drop(event)}
	on:dragend={event => dragend(event)}


>
	<div class="header">
		<h2 on:click={() => toggle(clip.id)}>
			<span class="svg"><Caret/></span>
			<span class="texts">
				{clip.slug}
				<span class="order">({clip.order})</span>
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
	{/if}
	<AssetBins {clip} selectedclip={selected}/>
</div>

<script>
	let elem
	let drag_src_elem = null
	function dragstart(event) {
		drag_src_elem = elem
		event.dataTransfer.effectAllowed = 'move'
		event.dataTransfer.setData('text/html', elem.outerHTML)
		elem.classList.add('drag-elem')
	}
	function dragenter(event) {}
	function dragover(event) {
		event.preventDefault()
		elem.classList.add('over')
		event.dataTransfer.dropEffect = 'move'
		// return false
	}
	function dragleave(event) {
		elem.classList.remove('over')
	}
	function drop(event) {
		event.stopPropagation()
		if (drag_src_elem !== elem) {
			// Set the source column's HTML to the HTML of the column we dropped on.
			console.log(elem)
			console.log(elem.outerHTML)

			//drag_src_elem.innerHTML = elem.innerHTML
			//elem.innerHTML = event.dataTransfer.getData('text/html')

			// elem.parentNode.removeChild(drag_src_elem)
			// const drop_html = event.dataTransfer.getData('text/html')
			// elem.insertAdjacentHTML('beforebegin', drop_html)
			// const drop_elem = elem.previousSibling
			// addDnDHandlers(drop_elem)
		}
		elem.classList.remove('over')
		// return false
	}
	function dragend(event) {
		elem.classList.remove('over')
	}



	export let clip
	export let index

	// import SequenceActions from './SequenceActions.svelte'
	import Button from '../../components/elements/Button.svelte'
	import Caret from '../../../svg/select-caret.svelte'
	import PostIcon from '../../../svg/admin-post.svelte'
	import SequenceForm from './SequenceForm.svelte'
	import AssetBins from './AssetBins.svelte'

	import {
		target,
		seq,
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
</script>

<style type="text/scss">
	.clip {
		display: flow-root;
		margin: 0 0 20rem;
		padding: 20rem 20rem 0;
		background-color: var(--admin-accent-1);
		border-radius: 15rem;
		cursor: pointer;
		user-select: none;
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
