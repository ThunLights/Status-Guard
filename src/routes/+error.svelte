<script lang="ts">
	import Meta from "$lib/components/meta.svelte";
	import Header from "$lib/components/header.svelte";
	import Footer from "$lib/components/footer.svelte";

	const { data } = $props();
	const { version } = data;

	const title = "Page Not Found";
</script>

<Meta {title} />

<Header />
<main>
	<p class="title text-center text-6xl">404</p>
	<div>
		<p class="text-center">Page not found.</p>
	</div>
</main>
<Footer {version} />

<style>
	main {
		overflow: hidden;
		min-height: 93vh;
	}
</style>
