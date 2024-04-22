<script lang="ts">
	import Navbar from '$lib/NavBar.svelte';
	import '../app.css';
	import Dashboard from '../lib/Dashboard.svelte';
	import { onMount } from 'svelte';
	import { chartOptions } from '$lib';
	import { invoke } from '@tauri-apps/api/tauri';
	import CurrentLoc from '$lib/CurrentLoc.svelte';

	let weather_details: any;
	let weather_data: any;
	let forecast: any;
	let is_Fetching: boolean = false;
	let key: number = 0;
	let ip_user: string;

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

		forecast = {
			day_overall: weather_details.forecast.forecastday[0].day
		};

		console.log(weather_details);

		weather_data = {
			day: getDay(weather_details.location.localtime),
			date: weather_details.location.localtime.slice(0, 10),
			location: weather_details.location.name,
			temperature: weather_details.current.temp_c,
			condition: weather_details.current.condition.text,
			last_updated: weather_details.current.last_updated.slice(0, 10),
			is_day: weather_details.current.is_day,
			humidity: weather_details.current.humidity,
			wind: weather_details.current.wind_kph,
			icon: weather_details.current.condition.icon,
			forecastChartOptions: chartOptions(weather_details.forecast.forecastday[0].hour),
			astro: weather_details.forecast.forecastday[0].astro
		};
		key += 1; // Key is For Force Re-Rendering Chart Component
	};

	const get_ip = async () => {
		const ip_user_addr: any = await invoke('get_user_ip');
		ip_user = ip_user_addr;
	};

	onMount(() => {
		const location = getLocation();
		fetchWeatherDetails(location);
		get_ip();
	});

	const handleLocationSet = (event: any) => {
		fetchWeatherDetails(event.detail.location);
	};
</script>

{#if weather_data}
	<main
		class={`${weather_data.is_day === 1 ? 'bg-gradient-to-b from-white to-yellow-100' : 'bg-gradient-to-r from-black to-blue-900'} p-4 min-h-screen`}
	>
		<Navbar on:loc_set={handleLocationSet} />
		<Dashboard {weather_data} {is_Fetching} {forecast} {key} />
		<CurrentLoc {ip_user} is_day={weather_data.is_day} />
	</main>
{/if}
