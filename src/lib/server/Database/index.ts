import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "$env/static/private";
import { default as pg } from "pg";

import { Website } from "./Database.website";
import { Api } from "./Database.api";
import { Status } from "./Database.status";

const { Pool } = pg;
const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);
export const _prisma = new PrismaClient({ adapter });

export class Database {
	public readonly website = new Website();
	public readonly api = new Api();
	public readonly status = new Status();
}

export const database = new Database();
