<script lang="ts">
	import "@fontsource/dela-gothic-one";
	import "@fontsource/m-plus-rounded-1c";
	import "@fontsource/kiwi-maru";

	import Meta from "$lib/components/meta.svelte";
	import Header from "$lib/components/header.svelte";
	import Footer from "$lib/components/footer.svelte";

	import { onMount } from "svelte";
	import { Status } from "$lib/client/status";

	import type { ResponseJson } from "$routes/api/home/+server";

	type StatusElemnt = ResponseJson["post"][number]["data"][number];

	let services = $state<ResponseJson["post"]>([]);

	onMount(async () => {
        await (async () => {
            const response = await fetch("/api/home", {
                method: "POST"
            });
            if (response.status === 200) {
                services = await response.json();
            }
        })();
	});
</script>

<Meta />

<div class="website">
	<Header />
	<main>
		<p class="title text-center">All services are working fine.</p>

		<div class="services">
			{#each services as service (service)}
				<div class="service">
					<p class="name">{service.label ?? service.domain}</p>
					<p>DOMAIN: {service.domain}</p>
					<div class="status">
						{#each new Array<StatusElemnt | null>(90 - service.data.length)
							.fill(null)
							.concat(service.data) as data, i (i)}
							{#if data}
								<div class={Status.parse(data.status)}></div>
							{:else}
								<div class="unknown"></div>
							{/if}
						{/each}
					</div>
				</div>
			{:else}
				<p class="not-found text-center">There are no services registered.</p>
			{/each}
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
		overflow: hidden;
		border-radius: 25px;
		background-color: #2d313d;
		width: 90%;
		margin: 16px auto;
	}
	.service {
		width: 95%;
		margin: 4px auto 10px auto;
	}
	.service .name {
		font-family: "Dela Gothic One", system-ui;
		font-size: 24px;
	}
	.not-found {
		padding: 10px 0;
	}
	.status {
		display: grid;
		gap: 1px;
		grid-template-columns: repeat(90, auto);
	}
	.status div {
		width: 100%;
		height: 28px;
	}
	.status div.ok {
		background-color: rgb(37, 255, 164);
	}
	.status div.unstable {
		background-color: yellow;
	}
	.status div.error {
		background-color: red;
	}
	.status div.unknown {
		background-color: rgb(80, 80, 80);
	}
	p {
		font-family: "M PLUS Rounded 1c", sans-serif;
	}
</style>
