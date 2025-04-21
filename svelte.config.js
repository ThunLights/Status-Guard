import nodeAdapter from "@sveltejs/adapter-node";
import cfAdapter from "@sveltejs/adapter-cloudflare-workers";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const adapter = (() => {
	const adapterType = process.env.ADAPTER_TYPE;
	if (adapterType === "cf") {
		return cfAdapter({
			config: "wrangler.jsonc"
		});
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
