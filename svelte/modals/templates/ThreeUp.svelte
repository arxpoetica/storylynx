<div class="clip template-{template} {themes.join(' ')} transition-{transition} clip-{clip.order}">
	<div class="img one" style={bg_one}></div>
	<div class="img two" style={bg_two}></div>
	<div class="img three" style={bg_three}></div>
</div>

<script>
	export let clip
	export let template
	export let themes
	export let transition
	export let html

	$: bg_one = `background-image:url(${clip.assets[0].url});`
	$: bg_two = `background-image:url(${clip.assets[1].url});`
	$: bg_three = `background-image:url(${clip.assets[2].url});`
</script>

<style type="text/scss">
	.clip {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 50rem;
		background-color: white;
		padding: 50rem;
		// overrides, so putting here:
		&.theme-no-border {
			grid-gap: 0;
			padding: 0;
		}
	}
	.img {
		flex: 1;
		padding-bottom: 100%;
		background: none repeat center top transparent;
		background-size: cover;
	}
</style>