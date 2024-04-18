<script>
	import { AngleLeftOutline } from 'flowbite-svelte-icons';
	import { Radio } from 'flowbite-svelte';
</script>

<section class="p-4">
	<a href="/">
		<div class="flex items-center gap-2 cursor-pointer">
			<AngleLeftOutline />
			Settings
		</div></a
	>

	<div class="p-6">
		<div class="text-lg">Options</div>
		<div class="mt-4">Choose a theme</div>
		<ul class="mt-4">
			<li class="flex gap-2"><Radio />System</li>
			<li class="flex gap-2"><Radio />Dark</li>
			<li class="flex gap-2"><Radio />Light</li>
		</ul>

		<div class="text-lg mt-8">Credits</div>
		<div class="text-sm">
			<div class="mt-4">Built With Tauri and Svelte-Kit</div>
            <div class="flex gap-2 mt-4">
                <img src="/icons/rust.svg" alt="rust" class="w-10">
                <img src="/icons/svelte.svg" alt="rust" class="w-8">
                <img src="/icons/tailwind.svg" alt="rust" class="w-10">
            </div>
		</div>

		<div class="text-lg mt-8">About</div>
		<div class="text-sm text-gray-400">
			<div class="mt-4">Weather App By Nada Labs</div>
			<div>Version 0.0.2 Beta</div>
		</div>
	</div>
</section>
