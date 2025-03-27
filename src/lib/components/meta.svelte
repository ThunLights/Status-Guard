<script lang="ts">
	import { PUBLIC_URL } from "$env/static/public";

	type Props = {
		title?: string;
		description?: string;
		keywords?: string;
		url?: string;
	};

	const props: Props = $props();
	const title = props.title ?? "Home";
	const description = props.description ?? "Regular monitoring of status minimizes damage to ddos.";
	const keywords = props.keywords ?? "";
	const url = props.url ?? PUBLIC_URL;
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="theme-color" content="#37b6e4" />
	<title>{title} / Status Guard</title>

	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{title} / Status Guard" />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Status Guard / Supported by Team ThunLights" />

	<meta name="format-detection" content="telephone=no,email=no,address=no" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@thunlights" />
	<meta name="twitter:creator" content="@thunlights" />
</svelte:head>
