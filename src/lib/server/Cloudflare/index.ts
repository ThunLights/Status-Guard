import Client from "cloudflare";
import { CF_API_KEY } from "$env/static/private";
import { Rulesets } from "./Cloudflare.rulesets";
import { Rules } from "./Cloudflare.rules";

export class CloudFlare {
	public readonly client = new Client({
		apiKey: CF_API_KEY
	});
	public readonly rulesets = new Rulesets(this.client);
	public readonly rules = new Rules(this.client);
}

export const cloudflare = new CloudFlare();
