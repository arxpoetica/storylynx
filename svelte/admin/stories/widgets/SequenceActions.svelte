<div class="button-wrap">
	<Button title="Delete" classes="alert blank" handler={() => handle_delete(index)}/>
	<!-- TODO: disable the `duplicate` button IF THE CLIP is being worked on / edited / not saved -->
	<Button title="Duplicate" classes="blank plain" handler={() => duplicate(index)}/>
	{#if selected}
		<Button title={saveable ? 'Cancel' : 'Close'} classes="warn" handler={cancel}/>
		<Button title="Save" classes="good" handler={save} disabled={!saveable}/>
	{:else}
		<Button title="Edit" handler={edit}/>
	{/if}
</div>
{#if duplicate_open}
	<ModalDuplicateClip clip={duplicate_clip} bind:open={duplicate_open}/>
{/if}
{#if delete_open}
	<ModalDeleteClip clip={delete_clip} bind:open={delete_open}/>
{/if}

<script>
	// export let clip
	export let index
	export let selected
	export let saveable
	export let preview_string

	import { seq, preview_clip } from '../../../../stores/admin-store.js'
	import { POST } from '../../../../utils/loaders.js'

	import Button from '../../components/elements/Button.svelte'
	import ModalDeleteClip from './ModalDeleteClip.svelte'
	import ModalDuplicateClip from './ModalDuplicateClip.svelte'

	async function save() {
		await POST('/api/admin/stories/clip-update.post', { clip: $preview_clip })
		$seq.clips[index] = $preview_clip
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

	let duplicate_clip
	let duplicate_open = false
	async function duplicate(index) {
		duplicate_clip = $seq.clips[index]
		duplicate_open = true
	}

	let delete_clip
	let delete_open = false
	async function handle_delete(index) {
		delete_clip = $seq.clips[index]
		delete_open = true
	}
</script>

<style type="text/scss">
	.button-wrap {
		display: flex;
		justify-content: flex-end;
		margin: 0;
		:global(.button) {
			margin: 0 0 0 15rem;
			&:first-child { margin: 0; }
		}
	}
</style>
