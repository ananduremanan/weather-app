<script lang="ts">
	import { Search, Button } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	let location: string = '';
	const dispatch = createEventDispatcher();

	const SearchHandler = () => {
		if (location != '') {
			localStorage.setItem('user_loc', JSON.stringify({ default_loc: location }));
			dispatch('loc_set', { location });
		}
	};
</script>

<nav class="flex">
	<div class="ml-auto flex gap-1">
		<Search size="sm" class="w-30 self-end bg-white" bind:value={location} />
		<Button class="p-1 bg-white border text-black" on:click={SearchHandler}
			><SearchOutline /></Button
		>
	</div>
</nav>
