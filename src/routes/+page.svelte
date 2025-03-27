<script lang="ts">
	import "@fontsource/m-plus-rounded-1c";
	import "@fontsource/kiwi-maru";

	import Meta from "$lib/components/meta.svelte";
	import Header from "$lib/components/header.svelte";
	import Footer from "$lib/components/footer.svelte";

	import { onMount } from "svelte";

	let services = $state([]);

	onMount(async () => {});
</script>

<Meta />

<div class="website">
	<Header />
	<main>
		<p class="title text-center">All services are working fine.</p>

		<div class="services">
			{#if services.length}
				{#each services as service (service)}
					<div class="service"></div>
				{/each}
			{:else}
				<p class="not-found text-center">There are no services registered.</p>
			{/if}
		</div>
	</main>
	<Footer />
</div>

<style>
	main {
		overflow: hidden;
		min-height: 93vh;
	}
	.title {
		font-family: "Kiwi Maru", serif;
		font-size: 30px;
		font-family: 600;
	}
	.services {
		border-radius: 25px;
		background-color: #2d313d;
		width: 90%;
		margin: 16px auto;
	}
	.not-found {
		padding: 10px 0;
	}
	p {
		font-family: "M PLUS Rounded 1c", sans-serif;
	}
</style>
