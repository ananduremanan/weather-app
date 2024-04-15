<script>
	import Navbar from '$lib/NavBar.svelte';
	import '../app.css';
</script>

<main class="p-4">
	<Navbar />
	<slot />
</main>
