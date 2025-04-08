import { Header } from "$lib/header";
import { cloudflare } from "./Cloudflare/index";
import { database } from "./Database/index";
import { Status } from "./status";

import type { Check } from "./status";

export async function changeRule(zoneId: string, enabled: boolean) {
	for (const { id } of (await cloudflare.rulesets.list(zoneId)) ?? []) {
		const rulesetId = id;
		const data = await cloudflare.rulesets.get(rulesetId, { zone_id: zoneId });
		for (const rule of data ? (data.rules ?? []) : []) {
			if (rule.id && rule.description && rule.description.startsWith("sg:")) {
				await cloudflare.rules.edit(id, rule.id, {
					zone_id: zoneId,
					enabled,
					action: rule.action ?? "rewrite",
					expression: rule.expression ?? "rewrite",
					description: rule.description
				});
			}
		}
	}
}

export async function resetRule() {
	await database.trigger.reset();
	for (const { zoneId } of (await database.website.list()) ?? []) {
		await changeRule(zoneId, false);
	}
}

export async function checkStatus(cache: Map<string, Check> | null) {
	for (const { domain, url, zoneId } of (await database.website.list()) ?? []) {
		const isChanged = await (async () => {
			if (cache) {
				return !cache.has(zoneId);
			}
			await database.trigger.deleteExpirrations();
			return !(await database.trigger.fetch(domain));
		})();
		if (isChanged) {
			const apis = (await database.api.fetchAll(domain)).concat({
				domain,
				url,
				method: null,
				header: null,
				body: null
			});
			for (const api of apis) {
				const method = api.method ?? "GET";
				const response = await Status.check(api.url, {
					method: api.method ?? "GET",
					headers: Header.parse(api.header),
					body: method !== "GET" && method !== null ? JSON.stringify(api.body) : undefined
				});
				if (response) {
					await database.status.update(api.domain, response.status);
				}
				if (response && !response.ok) {
					await changeRule(zoneId, true);
					if (cache) {
						cache.set(zoneId, response);
					} else {
						await database.trigger.insert(domain);
					}
					if (cache) {
						setTimeout(
							async () => {
								await changeRule(zoneId, false);
								cache.delete(zoneId);
							},
							60 * 60 * 1000
						);
					}
				}
			}
		}
	}
}
