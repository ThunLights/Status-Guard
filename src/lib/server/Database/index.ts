import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Website } from "./Database.website";
import { Api } from "./Database.api";
import { Status } from "./Database.status";

const DB_URL = await (async () => {
	try {
		const { DATABASE_URL } = await import("$env/static/private");
		return DATABASE_URL;
	} catch {
		return process.env["DATABASE_URL"];
	}
})();

export const _prisma = new PrismaClient({ datasourceUrl: DB_URL }).$extends(withAccelerate());

export class Database {
	public readonly website = new Website();
	public readonly api = new Api();
	public readonly status = new Status();
}

export const database = new Database();
