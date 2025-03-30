import type Client from "cloudflare";
import type { RequestOptions } from "cloudflare/core.mjs";

export class Rules {
	constructor(private readonly client: Client) {}

	public async edit(
		rulesetId: string,
		ruleId: string,
		params: Client.Rulesets.Rules.RuleEditParams,
		options?: RequestOptions
	) {
		try {
			return await this.client.rulesets.rules.edit(rulesetId, ruleId, params, options);
		} catch {
			return null;
		}
	}
}
