import Client from "cloudflare";
import { Rulesets } from "./Cloudflare.rulesets";
import { Rules } from "./Cloudflare.rules";

const API_KEY = await (async () => {
	try {
		const { CLOUDFLARE_API_KEY } = await import("$env/static/private");
		return CLOUDFLARE_API_KEY;
	} catch {
		return process.env["CLOUDFLARE_API_KEY"];
	}
})();

export class CloudFlare {
	public readonly client = new Client({
		apiToken: API_KEY
	});
	public readonly rulesets = new Rulesets(this.client);
	public readonly rules = new Rules(this.client);
}

export const cloudflare = new CloudFlare();
