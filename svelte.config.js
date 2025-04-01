import nodeAdapter from "@sveltejs/adapter-node";
import cfWorkersAdapter from "@sveltejs/adapter-cloudflare-workers";
import vercelAdapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const adapter = (() => {
	const adapterType = process.env.ADAPTER_TYPE;
	if (adapterType === "cf") {
		return cfWorkersAdapter({
			config: "wrangler.jsonc"
		});
	}
	if (adapterType === "vercel") {
		return vercelAdapter();
	}
	return nodeAdapter({
		out: "build"
	});
})();

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter,
		alias: {
			"$routes/*": "src/routes"
		}
	}
};

export default config;
