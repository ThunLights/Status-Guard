import type Client from "cloudflare";
import type { RequestOptions } from "cloudflare/core.mjs";
import type { RulesetGetParams } from "cloudflare/resources/rulesets/rulesets.mjs";

export class Rulesets {
	constructor(private readonly client: Client) {}

	public async list(zoneId: string) {
		try {
			const { result } = await this.client.rulesets.list({ zone_id: zoneId });
			return result;
		} catch {
			return [];
		}
	}

	public async get(rulesetId: string, params?: RulesetGetParams, options?: RequestOptions) {
		try {
			return await this.client.rulesets.get(rulesetId, params, options);
		} catch {
			return null;
		}
	}
}
