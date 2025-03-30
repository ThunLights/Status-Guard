import { Header } from "$lib/header";
import { cloudflare } from "$lib/server/Cloudflare/index";
import { database } from "$lib/server/Database/index";
import { Status } from "$lib/server/status";

import type { Check } from "$lib/server/status";
import type { Handle, HandleServerError } from "@sveltejs/kit";

process.on("uncaughtExceptionMonitor", console.log);

const throughStatuses = [404, 405];
const lockdownZones = new Map<string, Check>();

async function changeRule(zoneId: string, enabled: boolean) {
    for (const { id } of await cloudflare.rulesets.list(zoneId)) {
        const rulesetId = id;
        const data = await cloudflare.rulesets.get(rulesetId, { zone_id: zoneId });
        for (const rule of data ? data.rules : []) {
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

async function start() {
    for (const { zoneId } of await database.website.list()) {
        await changeRule(zoneId, false);
    }

	setInterval(async () => {
		for (const { domain, url, zoneId } of await database.website.list()) {
			if (!lockdownZones.has(zoneId)) {
				const apis = (await database.api.fetchAll(domain)).concat({
					domain,
					url,
					method: null,
					header: null,
					body: null
				});
				for (const api of apis) {
					const response = await Status.check(api.url, {
						method: api.method ?? "GET",
						headers: Header.parse(api.header),
						body: JSON.stringify(api.body)
					});
					if (response && !response.ok) {
                        await changeRule(zoneId, true);
						await database.status.update(api.domain, response.status);
						lockdownZones.set(zoneId, response);
						setTimeout(
							async () => {
								lockdownZones.delete(zoneId);
                                await changeRule(zoneId, false);
							},
							60 * 60 * 1000
						);
					}
				}
			}
		}
	}, 60 * 1000);
	setInterval(
		async () => {
			const expiration = Date.now() - 91 * 24 * 60 * 60 * 1000;
			for (const { domain, date } of await database.status.list()) {
				if (date.getTime() < expiration) {
					await database.status.remove(domain, date);
				}
			}
		},
		60 * 60 * 1000
	);
}

export const handleError = (async (input) => {
	if (throughStatuses.includes(input.status)) {
		return;
	}
	console.log(input);
}) satisfies HandleServerError;

export const handle = (async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set("Cache-Control", "no-store");
	response.headers.set("Pragma", "no-cache");
	return response;
}) satisfies Handle;

await start();
