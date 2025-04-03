import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Website } from "./Database.website";
import { Api } from "./Database.api";
import { Status } from "./Database.status";
import { DATABASE_URL } from "$env/static/private";

export const _prisma = new PrismaClient({ datasourceUrl: DATABASE_URL }).$extends(withAccelerate());

export class Database {
	public readonly website = new Website();
	public readonly api = new Api();
	public readonly status = new Status();
}

export const database = new Database();
