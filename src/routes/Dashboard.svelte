<script lang="ts">
	export let weather_data: any;
	export let is_Fetching: boolean;
	export let forecast: any;

	import { Skeleton, Chart, Indicator } from 'flowbite-svelte';

	const check_bg = (time: any) => {
		let background_img = '';
		if (time === 1) {
			background_img = '/images/sunny.svg';
		} else {
			background_img = 'images/night.svg';
		}
		return background_img;
	};
</script>

<section>
	{#if weather_data}
		<div class="flex flex-col md:flex-row gap-4 w-full mt-8">
			<div
				class="h-96 bg-cover bg-no-repeat p-10 rounded-3xl md:w-3/5 shadow-lg"
				style="background-image: url({check_bg(weather_data && weather_data.is_day)})"
			>
				{#if is_Fetching}
					<Skeleton />
				{:else if weather_data}
					<div class={weather_data.is_day ? 'text-black' : 'text-white'}>
						<div class="text-xl">{weather_data.day}</div>
						<div class="text-sm mt-2">
							{weather_data.date}, {weather_data.location}
						</div>
						<div class="text-8xl mt-8">{weather_data.temperature}º</div>
						<div class="flex">
							<img src={weather_data.icon} alt="" />
							<div class="mt-4 text-sm text-gray-400">
								{weather_data.condition}, last updated: {weather_data.last_updated}
								{#if forecast}
									<div>Chance of Rain: {forecast.day_overall.daily_chance_of_rain} %</div>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			</div>

			<div
				class="relative h-96 bg-cover bg-no-repeat p-6 rounded-3xl md:w-2/5 shadow-lg"
				style="background-image: url({check_bg(weather_data && weather_data.is_day)})"
			>
				{#if is_Fetching}
					<Skeleton class="w-full" />
				{:else if weather_data}
					<Chart options={weather_data.forecastChartOptions} class="w-full -mt-8" />
					<div class="absolute top-6 right-16">
						<p>Forecast</p>
						<div class="text-xs flex items-center gap-1">
							<Indicator color="red" size="xs" />Humidity: {weather_data.humidity}
						</div>
						<div class="text-xs flex items-center gap-1">
							<Indicator color="blue" size="xs" />Wind: {weather_data.wind} Kph
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</section>
