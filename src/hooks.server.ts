import { database } from "$lib/server/Database/index";
import { checkStatus, resetRule } from "$lib/server/trigger";

import type { Check } from "$lib/server/status";
import type { Handle, HandleServerError } from "@sveltejs/kit";

process.on("uncaughtExceptionMonitor", console.error);

const throughStatuses = [404, 405] satisfies Array<number>;
const lockdownZones = new Map<string, Check>();

async function start() {
	await resetRule();

	await checkStatus(null);

	setInterval(async () => {
		await checkStatus(lockdownZones);
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
	console.error(input.error);
}) satisfies HandleServerError;

export const handle = (async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set("Cache-Control", "no-store");
	response.headers.set("Pragma", "no-cache");
	return response;
}) satisfies Handle;

await start();
