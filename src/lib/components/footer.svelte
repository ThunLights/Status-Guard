<script lang="ts">
	import { repoUrl } from "$lib/constants";

	type Props = {
		version: string;
	};

	const { version }: Props = $props();
</script>

<footer>
	<p class="text-center">
		Powerd by <a href={repoUrl} target="_blank" rel="noopener noreferrer">Status Guard@{version}</a>
	</p>
</footer>

<style>
	footer {
		background-color: #212227;
	}
	p {
		padding: 3px 5px;
	}
	a {
		color: #58d4e4;
	}
</style>
