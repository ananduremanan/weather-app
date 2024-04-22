<script lang="ts">
	export let weather_data: any;
	export let is_Fetching: boolean;
	export let forecast: any;
	export let key: number;

	import { Skeleton, Chart, Indicator, SpeedDial, SpeedDialButton } from 'flowbite-svelte';
	import {
		ShareNodesSolid,
		PrinterSolid,
		DotsHorizontalOutline,
		AdjustmentsHorizontalSolid
	} from 'flowbite-svelte-icons';

	const check_bg = (time: number, is_forecast: boolean): string => {
		let background_img = 'images/night.svg';
		if (is_forecast) {
			background_img = time === 1 ? '/images/forecast-day.svg' : '/images/forecast-night.svg';
		} else {
			background_img = time === 1 ? '/images/sunny.svg' : 'images/night.svg';
		}
		return background_img;
	};
</script>

<section>
	{#if weather_data}
		<div class="flex flex-col md:flex-row gap-4 w-full mt-8">
			<div
				class="h-96 bg-cover bg-no-repeat p-10 rounded-3xl md:w-3/5 shadow-lg"
				style="background-image: url({check_bg(weather_data && weather_data.is_day, false)})"
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
				style="background-image: url({check_bg(weather_data && weather_data.is_day, true)})"
			>
				{#if is_Fetching}
					<Skeleton class="w-full" />
				{:else if weather_data}
					{#key key}
						<Chart options={weather_data.forecastChartOptions} class="w-full -mt-8" {key} />
					{/key}
					<div
						class={`${weather_data.is_day ? 'text-black' : 'text-white'} absolute top-6 right-16`}
					>
						<p>Forecast Today</p>
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

		<div class="flex flex-wrap gap-4 mt-4">
			<div
				class={`${weather_data.is_day ? 'text-black' : 'text-white'} px-10 py-8 bg-white inline-block rounded-3xl shadow-lg`}
				style="background-image: url({check_bg(weather_data && weather_data.is_day, true)})"
			>
				{#if is_Fetching}
					<Skeleton class="w-full" />
				{:else}
					<img src="/images/sunrise.svg" class="w-8 h-8" alt="" />
					<div>Sunrise Details</div>
					<div class="mt-4">Sunrise: {weather_data.astro.sunrise}</div>
					<div>Sunset: {weather_data.astro.sunset}</div>
				{/if}
			</div>

			<div
				class={`${weather_data.is_day ? 'text-black' : 'text-white'} px-10 py-8 bg-white inline-block rounded-3xl shadow-lg`}
				style="background-image: url({check_bg(weather_data && weather_data.is_day, true)})"
			>
				{#if is_Fetching}
					<Skeleton class="w-full" />
				{:else}
					<img src="/images/sunrise.svg" class="w-8 h-8" alt="" />
					<div>Summary</div>
					<div class="mt-4 flex flex-col md:flex-row gap-4">
						<div>
							<div>Average Humidity : {weather_data.dayOverView.avghumidity}</div>
							<div>Average Temperature : {weather_data.dayOverView.avgtemp_c}</div>
						</div>
						<div>
							<div>Max Temperature : {weather_data.dayOverView.maxtemp_c}</div>
							<div>Min Temperature : {weather_data.dayOverView.mintemp_c}</div>
						</div>
					</div>
				{/if}
			</div>

			<div
				class={`${weather_data.is_day ? 'text-black' : 'text-white'} px-10 py-8 bg-white inline-block rounded-3xl shadow-lg`}
				style="background-image: url({check_bg(weather_data && weather_data.is_day, true)})"
			>
				{#if is_Fetching}
					<Skeleton class="w-full" />
				{:else}
					<div class="flex flex-col text-6xl items-left justify-center h-full">
						<span class="text-xs">Local Time</span>
						{weather_data.localTime.slice(10)}
					</div>
				{/if}
			</div>
		</div>

		<SpeedDial defaultClass="fixed end-6 bottom-6 print:hidden">
			<DotsHorizontalOutline slot="icon" class="w-8 h-8" />
			<SpeedDialButton name="Share">
				<ShareNodesSolid class="w-6 h-6" />
			</SpeedDialButton>
			<SpeedDialButton
				name="Print"
				on:click={() => {
					window.print();
				}}
			>
				<PrinterSolid class="w-6 h-6" />
			</SpeedDialButton>
			<SpeedDialButton name="Settings">
				<a href="/settings?is_day={weather_data.is_day}"
					><AdjustmentsHorizontalSolid class="w-6 h-6" /></a
				>
			</SpeedDialButton>
		</SpeedDial>
	{/if}
</section>
