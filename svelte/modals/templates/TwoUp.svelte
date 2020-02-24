<div class="clip template-{template} theme-{theme} clip-{clip.order}">
	<div class="img one" style={bg_one}></div>
	<div class="img two" style={bg_two}></div>
</div>

<script>
	export let clip
	export let template
	export let theme
	export let html

	$: bg_one = `background-image:url(${clip.assets[0].url});`
	$: bg_two = `background-image:url(${clip.assets[1].url});`
</script>

<style type="text/scss">
	.clip {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 60rem;
		height: 60vh;
		background-color: white;
		padding: 60rem;
		// &.theme-default,
		// &[class*="theme-background-"] {
		// 	background-color: white;
		// 	background-repeat: no-repeat;
		// 	background-size: cover;
		// 	.clip-wrap {
		// 		background-repeat: no-repeat;
		// 		background-size: cover;
		// 	}
		// }
		// &.theme-background-center-top .clip-wrap { background-position: center top; }
		// &.theme-background-center-right .clip-wrap { background-position: right center; }
		// &.theme-background-center-bottom .clip-wrap { background-position: center bottom; }
		// &.theme-background-center-left .clip-wrap { background-position: left center; }
		// &.theme-background-top-left .clip-wrap { background-position: left top; }
		// &.theme-background-top-right .clip-wrap { background-position: right top; }
		// &.theme-background-bottom-left .clip-wrap { background-position: left bottom; }
		// &.theme-background-bottom-right .clip-wrap { background-position: right bottom; }
		// &.theme-red {
		// 	// FIXME: make these variables!!!
		// 	color: #f4ece1;
		// 	background-image: url('/img/experience/tan-square.jpg');
		// 	.clip-wrap { background-image: url('/img/experience/red-square.jpg'); }
		// }
		// &.theme-gray {
		// 	color: #333;
		// 	background-image: url('/img/experience/black-square.jpg');
		// 	.clip-wrap { background-image: url('/img/experience/gray-square.jpg'); }
		// }
		// .detail {
		// 	.title {
		// 		font: 120rem/1 $font;
		// 	}
		// }
	}
	.template-fullscreen-no-border {
		padding: 0;
	}
	.img {
		flex: 1;
		height: 100%;
		background: none repeat center top transparent;
		background-size: cover;
	}
</style>
