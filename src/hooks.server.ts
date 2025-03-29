import { Header } from "$lib/header";
import { database } from "$lib/server/Database/index";
import { Status } from "$lib/server/status";

import type { Handle, HandleServerError } from "@sveltejs/kit";

process.on("uncaughtExceptionMonitor", console.log);

const throughStatuses = [404, 405];

async function start() {
	setInterval(async () => {
		for (const { domain, url } of await database.website.list()) {
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
					await database.status.update(api.domain, response.status);
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
