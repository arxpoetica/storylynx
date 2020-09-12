<div class="form">

	<!-- Hide Navigation -->
	<!-- Order -->
	<!-- Asset Bins =>>>>>> -->
	<!-- Styles =>>>>> -->
	<!-- [Parent Sequence] -->
	<!-- <Checkbox handler={uncheck} bind:checked classes="good"/> -->

	<div class="row">
		<Input
			label="Title"
			sublabel="Displays in sequence navigation, unless &quot;Hide Navigation&quot; checked."
			prelabel={$preview_clip.order}
			bind:value={$preview_clip.slug}
			required={true}
		/>
		<div class="nav-checkbox">
			<Checkbox label="Hide navigation" bind:checked={$preview_clip.hide_navigation}/>
		</div>
	</div>
	<div class="row">
		<Select
			label="Template"
			bind:value={template_id}
			required={true}
			options={$templates}
		/>
	</div>
	<div class="row full">
		<MultiSelect
			label="Theme Elements"
			bind:values={$preview_clip.theme_elements}
			options={$theme_elements}
		/>
	</div>
	<div class="row full">
		<MultiSelect
			label="Transitions"
			bind:values={$preview_clip.transitions}
			options={$template_transitions}
		/>
	</div>
</div>

<script>
	// export let sequence

	import { preview_clip, templates, theme_elements, template_transitions } from '../../../../stores/admin-store.js'

	let template_id
	let init
	import { onMount } from 'svelte'
	onMount(() => {
		init = true
		template_id = $preview_clip.template
	})
	$: if (init) { $preview_clip.template = template_id }

	import Input from '../../components/elements/Input.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'
	import Select from '../../components/elements/Select.svelte'
	import MultiSelect from '../../components/elements/MultiSelect.svelte'
</script>

<style type="text/scss">
	.form {
		margin: 10rem 0 30rem 0;
		padding: 20rem 20rem 0;
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		border-radius: 12rem;
	}
	.row {
		display: grid;
		align-items: flex-start;
		grid-template-columns: 2fr 1fr;
		grid-column-gap: 20rem;
		max-width: 600rem;
		&.full {
			grid-template-columns: 1fr;
		}
	}
	.nav-checkbox {
		margin-top: 22rem;
	}
</style>
