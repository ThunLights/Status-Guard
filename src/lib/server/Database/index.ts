import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Website } from "./Database.website";
import { Api } from "./Database.api";
import { Status } from "./Database.status";
import { Trigger } from "./Database.trigger";

const DB_URL = await (async () => {
	try {
		const { DATABASE_URL } = await import("$env/static/private");
		return DATABASE_URL;
	} catch {
		return process.env["DATABASE_URL"];
	}
})();

export const _prisma = (await (async () => {
	try {
		const { OPTION_ACCELERATE } = await import("$env/static/private");
		if (OPTION_ACCELERATE === "no_use") {
			return new PrismaClient();
		}
	} catch {
		if (process.env["OPTION_ACCELERATE"] === "no_use") {
			return new PrismaClient();
		}
	}
	return new PrismaClient({ datasourceUrl: DB_URL }).$extends(withAccelerate());
})()) as PrismaClient;

export class Database {
	public readonly website = new Website();
	public readonly api = new Api();
	public readonly status = new Status();
	public readonly trigger = new Trigger();
}

export const database = new Database();
