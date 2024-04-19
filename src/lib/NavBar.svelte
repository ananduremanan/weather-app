<script lang="ts">
	import { Search, Button } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	let searchInput: string = '';
	const dispatch = createEventDispatcher();
	let autoSearchArray: any[];

	const SearchHandler = () => {
		if (searchInput != '') {
			localStorage.setItem('user_loc', JSON.stringify({ default_loc: searchInput }));
			dispatch('loc_set', { location: searchInput });
			searchInput = '';
		}
	};

	const handleSearchInput = async () => {
		if (searchInput != '') {
			try {
				const res = await fetch(`${import.meta.env.VITE_WEATHER_API_SEARCH}${searchInput}&aqi=no`);
				const data = await res.json();
				autoSearchArray = data;
			} catch (error) {
				console.error(error);
			}
		}
	};
</script>

<nav class="flex gap-2 print:hidden">
	<div class="ml-auto relative">
		<Search
			size="sm"
			class="w-30 self-end bg-white"
			bind:value={searchInput}
			on:input={handleSearchInput}
		/>
		{#if autoSearchArray && autoSearchArray.length > 0}
			<div
				class="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10"
			>
				{#each autoSearchArray as locationItem}
					<button
						class="px-4 py-2 border-b border-gray-200 hover:bg-orange-400 w-full"
						on:click={() => {
							searchInput = locationItem.name;
							autoSearchArray = [];
						}}
					>
						{locationItem.name}, {locationItem.country}
					</button>
				{/each}
			</div>
		{/if}
	</div>
	<Button class="p-1 bg-white border text-black" on:click={SearchHandler}>
		<SearchOutline />
	</Button>
</nav>
