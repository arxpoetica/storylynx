<div class="form">

	<!-- Hide Navigation -->
	<!-- Order -->
	<!-- Asset Bins =>>>>>> -->
	<!-- Styles =>>>>> -->
	<!-- [Parent Sequence] -->

	<div class="row">
		<Input
			label="Title"
			sublabel="Displays in sequence navigation, unless &quot;Hide Navigation&quot; checked below."
			bind:value={clip.slug}
			required={true}
		/>
		<!-- <Checkbox handler={uncheck} bind:checked color="good"/> -->
		<div class="nav-checkbox">
			<Checkbox label="Hide navigation" color="warn"/>
		</div>
	</div>
	<div class="row">
		<Select
			label="Template"
			primary="Select One"
			required={true}
			options={[]}
		/>
	</div>
	<div class="row">
		<Select
			label="Theme Elements"
			primary="Select One"
			required={true}
			options={[]}
		/>
	</div>
	<div class="row">
		<Select
			label="Transitions"
			primary="Select One"
			required={true}
			options={[]}
		/>
	</div>
		<!-- bind:value={parent_index} -->
	<!-- <Input type="number" label="Order" prelabel="{true}-" required={true}/> -->
</div>

<script>
	export let sequence
	export let clip

	import Input from '../../components/elements/Input.svelte'
	import Checkbox from '../../components/elements/Checkbox.svelte'
	import Select from '../../components/elements/Select.svelte'
	// import Button from '../../components/elements/Button.svelte'
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
	}
	.nav-checkbox {
		margin-top: 22rem;
	}
</style>
