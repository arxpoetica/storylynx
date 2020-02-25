<div class="clip template-{template} {themes.join(' ')} transition-{transition} clip-{clip.order}">
	<div class="clip-wrap" style={bg}>
		<div class="detail">
			{#if clip.name}
				<h2 class="title">{clip.name}</h2>
				<!-- TODO: HTML here?????????? -->
			{/if}
		</div>
	</div>
</div>

<script>
	export let clip
	export let template
	export let themes
	export let transition
	export let html

	$: bg
		= (themes.indexOf('theme-default') > -1 || themes.find(theme => theme.indexOf('background') > -1)) && clip.assets.length
		? `background-image:url(${clip.assets[0].url});`
		: undefined
</script>

<style type="text/scss">
	.clip {
		height: 100vh;
		padding: 50rem;
		background: none repeat center transparent;
		&.theme-default,
		&[class*="theme-background-"] {
			background-color: white;
			background-repeat: no-repeat;
			background-size: cover;
			.clip-wrap {
				background-repeat: no-repeat;
				background-size: cover;
			}
		}
		&.theme-background-center-top .clip-wrap { background-position: center top; }
		&.theme-background-center-right .clip-wrap { background-position: right center; }
		&.theme-background-center-bottom .clip-wrap { background-position: center bottom; }
		&.theme-background-center-left .clip-wrap { background-position: left center; }
		&.theme-background-top-left .clip-wrap { background-position: left top; }
		&.theme-background-top-right .clip-wrap { background-position: right top; }
		&.theme-background-bottom-left .clip-wrap { background-position: left bottom; }
		&.theme-background-bottom-right .clip-wrap { background-position: right bottom; }
	}
	.clip-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: none repeat center transparent;
	}
	.theme-no-border {
		padding: 0;
	}
</style>