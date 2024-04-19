<script lang="ts">
	import { AngleLeftOutline } from 'flowbite-svelte-icons';
	import { Radio } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import Rust from '$lib/icons/Rust.svelte';
	import Svelte from '$lib/icons/Svelte.svelte';
	import Tailwind from '$lib/icons/Tailwind.svelte';
	import { open } from '@tauri-apps/api/shell';

	const is_day = $page.url.searchParams.get('is_day');
</script>

<section
	class={`${is_day === '1' ? 'bg-gradient-to-r from-white to-yellow-100 text-black' : 'bg-gradient-to-r from-black to-blue-900 text-white'} p-4 min-h-screen`}
>
	<a href="/">
		<div class="flex items-center gap-2 cursor-pointer">
			<AngleLeftOutline />
			Settings
		</div></a
	>

	<div class="p-6">
		<div class="text-lg">Options</div>
		<div class="mt-4">Notification Settings</div>
		<div class="flex gap-1 mt-4"><Radio /> Show Notifictaion</div>

		<div class="text-lg mt-8">Credits</div>
		<div class="text-sm">
			<div class="mt-4">Built With Tauri and Svelte-Kit</div>
			<div class="flex gap-2 mt-4">
				<Rust color={is_day === '1' ? 'black' : 'white'} />
				<Svelte color={is_day === '1' ? 'black' : 'white'} />
				<Tailwind color={is_day === '1' ? 'black' : 'white'} />
			</div>
			<div class="mt-4">Icon Credit</div>
			<div class="mt-2">
				<!-- <a
					href="https://www.flaticon.com/free-icons/weather-app"
					title="weather app icons"
					target="_blank">Weather app icons created by Freepik - Flaticon</a
				> -->
				<button
					on:click={() => {
						open('https://www.flaticon.com/free-icons/weather-app');
					}}>Weather app icons created by Freepik - Flaticon</button
				>
			</div>
		</div>

		<div class="text-lg mt-8">About</div>
		<div class="text-sm text-gray-400">
			<div class="mt-4">Weather App By Nada Labs</div>
			<div>Version 0.0.2 Beta</div>
		</div>
	</div>
</section>
