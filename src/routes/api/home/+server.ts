import { json } from "@sveltejs/kit";
import { database } from "$lib/server/Database/index";

import type { RequestHandler } from "./$types";

export type ResponseJson = {
	post: Array<{
		domain: string;
		label: string | null;
		data: {
			status: number[];
			date: number;
		}[];
	}>;
};

export const POST = (async () => {
	const data: ResponseJson["post"] = [];
	for (const { domain, label } of await database.website.list()) {
		data.push({
			domain,
			label,
			data: (await database.status.list({ where: { domain } })).map(({ status, date }) => {
				return { status, date: date.getTime() };
			})
		});
	}
	return json(data satisfies ResponseJson["post"], { status: 200 });
}) satisfies RequestHandler;
