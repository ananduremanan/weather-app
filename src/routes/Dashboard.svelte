<script lang="ts">
	export let weather_data: any;
	export let is_Fetching: boolean;
	export let forecast: any;
	import { Skeleton } from 'flowbite-svelte';
</script>

<section>
	<div class="flex flex-col md:flex-row gap-4 w-full mt-8">
		<div class="bg-[url('/images/sunny.svg')] h-96 bg-cover bg-no-repeat p-10 rounded-3xl md:w-1/2">
			{#if is_Fetching}
				<Skeleton />
			{:else if weather_data}
				<div>
					<div class="text-xl">{weather_data.day}</div>
					<div class="text-sm mt-2">
						{weather_data.date}, {weather_data.location}
					</div>
					<div class="text-8xl mt-12">{weather_data.temperature}º</div>
					<div class="mt-4 text-sm text-gray-400">
						{weather_data.condition}, last updated: {weather_data.last_updated}
					</div>
				</div>
			{/if}
		</div>

		<div class="bg-[url('/images/sunny.svg')] h-96 bg-cover bg-no-repeat p-10 rounded-3xl md:w-3/4">
			{#if forecast}
				{#each forecast.day_temp as hours}
					<div>{hours.time}</div>
				{/each}
			{/if}
		</div>
	</div>
</section>
