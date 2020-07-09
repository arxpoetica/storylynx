<div class="header" class:fullwidth>
	<h1 class="ghost">{title}</h1>
	{#if actions}
		<slot name="actions"></slot>
	{/if}
	{#if toolbar}
		<slot name="toolbar"></slot>
	{/if}
</div>
<div class="content">
	<slot></slot>
</div>

<script>
	export let title = 'StoryLynx'
	export let fullwidth = false
	import { fullwidth as fullwidth_store } from '../../../../stores/admin-store.js'
	$: $fullwidth_store = fullwidth

	// TODO: this api is fragile and could break at any moment!
	// https://discordapp.com/channels/457912077277855764/571775594002513921/729160787393904650
	export let actions = !!($$props.$$slots && $$props.$$slots.actions)
	export let toolbar = !!($$props.$$slots && $$props.$$slots.toolbar)
</script>

<style type="text/scss">
	.header {
		:global {
			.actions {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 0 20rem;
			}
		}
		&.fullwidth {
			:global {
				.actions {
					padding: 0 20rem;
				}
			}
		}
	}
	.content {
		position: relative;
	}
</style>
