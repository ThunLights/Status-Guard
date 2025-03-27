import type { Handle, HandleServerError } from "@sveltejs/kit";

process.on("uncaughtExceptionMonitor", console.log);

const throughStatuses = [404, 405];

async function start() {}

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
