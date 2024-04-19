<script>
	import { page } from '$app/stores';
	import Transitions from '$lib/Transitions.svelte';
</script>

<div>
	<Transitions url={$page.url}>
		<slot />
	</Transitions>
</div>
