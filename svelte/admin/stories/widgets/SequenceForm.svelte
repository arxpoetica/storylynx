<div class="form rows">

	<div class="row">
		<Input
			label="Title"
			sublabel="Displays in sequence navigation, unless &quot;Hide Navigation&quot; checked."
			bind:value={$clip.slug}
			required={true}
		/>
		<div class="nav-checkbox">
			<Checkbox label="Hide navigation" bind:checked={$clip.hide_navigation}/>
		</div>
	</div>
	<div class="row">
		<Select
			label="Template"
			bind:value={template_id}
			required={true}
			options={$enums.templates}
		/>
	</div>
	<div class="row full">
		<MultiSelect
			label="Theme Elements"
			bind:values={$clip.theme_elements}
			options={$enums.theme_elements}
		/>
	</div>
	<div class="row full">
		<MultiSelect
			label="Transitions"
			bind:values={$clip.transitions}
			options={$enums.template_transitions}
		/>
	</div>
	<div class="row full">
		<div class="label">Padding</div>
		<div class="sublabel">Gap padding only applies to space between columns in multi-column layouts.</div>
		<div class="row fives">
			<Input sublabel="Top" type="number" bind:value={$clip.styles.top}/>
			<Input sublabel="Bottom" type="number" bind:value={$clip.styles.bottom}/>
			<Input sublabel="Left" type="number" bind:value={$clip.styles.left}/>
			<Input sublabel="Right" type="number" bind:value={$clip.styles.right}/>
			<Input sublabel="Gap" type="number" bind:value={$clip.styles.gap}/>
		</div>
	</div>
	<div class="row">
		<Input
			label="Template Width"
			sublabel="
				This will set the width of the template (centered) in pixels.
				If the &quot;Width as Percent&quot; checkbox is set,
				this number will be treated as a percentage width,
				between 0 and 100. This will override any theme element width sizings."
			type="number"
			bind:value={$clip.styles.width}
		/>
		<div class="nav-checkbox">
			<Checkbox label="Width as Percent" bind:checked={$clip.styles.percent}/>
		</div>
	</div>
	<div class="row">
		<Input
			label="Template Height"
			sublabel="
				This will set the height of the template in pixels.
				This will only ever be in pixels.
				Percentage only applies to width for responsive reasons."
			type="number"
			bind:value={$clip.styles.height}
		/>
	</div>

</div>

<script>
	import { preview_clip as clip, enums } from '../../../../stores/admin-store.js'

	let template_id
	let init
	import { onMount } from 'svelte'
	onMount(() => {
		init = true
		template_id = $clip.template
	})
	$: if (init) { $clip.template = template_id }

	import Input from '../../components/elements/Input.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'
	import Select from '../../components/elements/Select.svelte'
	import MultiSelect from '../../components/elements/MultiSelect.svelte'
</script>

<style type="text/scss">
	.form {
		padding: 20rem;
		background-color: rgba(var(--admin-accent-0-rgb), 0.2);
		border-radius: 12rem;
	}
	.label {
		margin: 0 0 8rem;
		font: bold 15rem/1 var(--admin-font);
	}
	.sublabel {
		margin: 0 0 8rem;
		font: 13rem/1 var(--admin-font);
		opacity: 0.6;
	}
	.nav-checkbox {
		margin-top: 22rem;
	}
</style>
