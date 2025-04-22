import { json } from "@sveltejs/kit";
import { database } from "$lib/server/Database/index";

import type { RequestHandler } from "./$types";

export type ApiHomeResponse = {
	post: Array<{
		domain: string;
		label: string | null;
		data: {
			status: Record<string, number>;
			date: number;
		}[];
	}>;
};

function parseStatus(content: number[]) {
	const result: Record<string, number> = {};
	for (const statusCodeBase of content) {
		const statusCode = statusCodeBase.toString();
		result[statusCode] = result[statusCode] + 1 || 1;
	}
	return result;
}

export const POST = (async () => {
	const data: ApiHomeResponse["post"] = [];
	for (const { domain, label } of await database.website.list()) {
		data.push({
			domain,
			label,
			data: (await database.status.list({ where: { domain } })).map(({ status, date }) => {
				return {
					status: parseStatus(status),
					date: date.getTime()
				};
			})
		});
	}
	return json(data satisfies ApiHomeResponse["post"], { status: 200 });
}) satisfies RequestHandler;
