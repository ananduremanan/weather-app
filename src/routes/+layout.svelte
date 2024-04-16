<script lang="ts">
	import Navbar from '$lib/NavBar.svelte';
	import '../app.css';
	import Dashboard from './Dashboard.svelte';
	import { onMount } from 'svelte';

	let weather_details: any;
	let weather_data: any;
	let forecast: any;
	let is_Fetching: boolean = false;

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
			is_Fetching = true;
			const res = await fetch(`${import.meta.env.VITE_WEATHER_API}${location}&aqi=no`);
			return await res.json();
		} catch (error) {
			console.error(error);
			return null;
		} finally {
			is_Fetching = false;
		}
	};

	const fetchWeatherDetails = async (location: string) => {
		localStorage.setItem('default', JSON.stringify({ default_loc: 'kochi' }));
		weather_details = await getWeather(location);
		console.log(weather_details);

		weather_data = {
			day: getDay(weather_details.location.localtime),
			date: weather_details.location.localtime.slice(0, 10),
			location: weather_details.location.name,
			temperature: weather_details.current.temp_c,
			condition: weather_details.current.condition.text,
			last_updated: weather_details.current.last_updated.slice(0, 10),
			is_day: weather_details.current.is_day
		};

		forecast = { day_temp: weather_details.forecast.forecastday[0].hour };

		console.log(forecast);
	};

	onMount(() => {
		const location = getLocation();
		fetchWeatherDetails(location);
	});

	const handleLocationSet = (event: any) => {
		fetchWeatherDetails(event.detail.location);
	};
</script>

<main class="p-4">
	<Navbar on:loc_set={handleLocationSet} />
	<Dashboard {weather_data} {is_Fetching} {forecast} />
</main>
