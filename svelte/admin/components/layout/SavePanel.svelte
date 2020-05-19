{#if $saving}
	<div class="saving">
		<div class="group">
			<h2>Saving...</h2>
			<div class="svg"><Zzz/></div>
		</div>
	</div>
{/if}

<script>
	import { saving } from '../../../../stores/admin-store.js'
	import Zzz from '../../../svg/zzz.svelte'
</script>

<style type="text/scss">
	.saving {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 100rem;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		z-index: 100;
	}
	.group {
		display: flex;
		align-items: flex-end;
	}
	h2 {
		margin: 0 0 3rem;
	}
	.svg {
		width: 40rem;
		height: 40rem;
	}
</style>
