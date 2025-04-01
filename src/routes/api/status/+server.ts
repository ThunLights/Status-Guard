import { json } from "@sveltejs/kit";
import { database } from "$lib/server/Database/index";
import { Status } from "$lib/client/status";

import type { RequestHandler } from "./$types";
import type { ParsedStatus } from "$lib/client/status";

export type ApiStatusResponse = {
	post: Array<{
		domain: string;
		status: ParsedStatus;
	}>;
};

export const POST = (async () => {
	const data: ApiStatusResponse["post"] = [];
	for (const { domain } of await database.website.list()) {
		const websiteData = await database.status.fetch({
			where: { domain, date: database.status.nowDate }
		});
		if (websiteData) {
			data.push({
				domain,
				status: Status.parse(websiteData.status)
			});
		}
	}
	return json(data satisfies ApiStatusResponse["post"], { status: 200 });
}) satisfies RequestHandler;
