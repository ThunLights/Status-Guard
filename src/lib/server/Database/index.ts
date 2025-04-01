import { PrismaClient } from "@prisma/client";
import { Website } from "./Database.website";
import { Api } from "./Database.api";
import { Status } from "./Database.status";
//import { withAccelerate } from "@prisma/extension-accelerate";

export const _prisma = new PrismaClient();

export class Database {
	public readonly website = new Website();
	public readonly api = new Api();
	public readonly status = new Status();
}

export const database = new Database();
