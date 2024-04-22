<script lang="ts">
	export let ip_user: string;
	export let is_day: number;

	import { Indicator, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let location: string;
	let is_Fetching: boolean = false;

	const getUserLocation = async () => {
		try {
			is_Fetching = true;
			const res = await fetch(`${import.meta.env.VITE_IP_API}${ip_user}`);
			const info = await res.json();
			location = info.error.message;
		} catch (error) {
			console.error(error);
		} finally {
			is_Fetching = false;
		}
	};

	onMount(() => {
		getUserLocation();
	});
</script>

<div
	class={`${is_day && is_day === 1 ? 'text-black' : 'text-white'} glass rounded-lg p-2 inline-block fixed start-6 bottom-6 print:hidden`}
>
	{#if ip_user}
		<div class="flex items-center gap-2">
			<Indicator color="green" size="xs" />
			<span class="whitespace-nowrap text-xs"
				>Location : {#if is_Fetching}
					<Spinner size="4" />
				{:else}
					{location}
				{/if}</span
			>
		</div>
	{/if}
</div>
