<script lang="ts">
	import { onMount } from 'svelte';
	let weather_details: any;

	const getDay = (dateString: string) => {
		const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const date = new Date(dateString);
		return dayNames[date.getDay()];
	};

	const getLocation = () => {
		const userLoc = localStorage.getItem('user_loc') || localStorage.getItem('default');
		return userLoc ? JSON.parse(userLoc).default_loc : null;
	};

	const getWeather = async (location: any) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_WEATHER_API}${location}&aqi=no`);
			return await res.json();
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	onMount(async () => {
		localStorage.setItem('default', JSON.stringify({ default_loc: 'kochi' }));
		const location = getLocation();
		weather_details = await getWeather(location);
		console.log(weather_details);
	});
</script>

<section>
	<div class="flex flex-col md:flex-row gap-4 w-full mt-8">
		<div
			class="bg-[url('/images/sunny.svg')] h-96 bg-cover bg-no-repeat p-10 rounded-3xl md:w-[60vw]"
		>
			{#if weather_details}
				<div>
					<div class="text-xl">{getDay(weather_details.location.localtime)}</div>
					<div class="text-sm mt-2">
						{weather_details.location.localtime.slice(0, 10)}, {weather_details.location.name}
					</div>
					<div class="text-8xl mt-12">{weather_details.current.temp_c}º</div>
					<div class="mt-4 text-sm text-gray-400">
						{weather_details.current.condition.text}, last updated: {weather_details.current.last_updated.slice(
							0,
							10
						)}
					</div>
				</div>
			{/if}
		</div>
		<div class="bg-[url('/images/sunny.svg')] h-96 bg-cover p-10 rounded-3xl md:w-[40vw]">
			{#if weather_details}
				<div>
					<div class="text-xl">{getDay(weather_details.location.localtime)}</div>
					<div class="text-sm mt-2">
						{weather_details.location.localtime.slice(0, 10)}, {weather_details.location.name}
					</div>
					<div class="text-8xl mt-12">{weather_details.current.temp_c}º</div>
					<div class="mt-4 text-sm text-gray-400">
						{weather_details.current.condition.text}, last updated: {weather_details.current.last_updated.slice(
							0,
							10
						)}
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
