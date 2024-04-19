<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let url: URL;
</script>

{#key url}
	<div in:slide={{ duration: 500, delay: 0, easing: quintOut, axis: 'x' }}>
		<slot />
	</div>
{/key}
