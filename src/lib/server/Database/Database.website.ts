import { _prisma } from "./index";

export class Website {
	private readonly table = _prisma.website;

	public async fetch(domain: string) {
		try {
			return await this.table.findFirst({ where: { domain } });
		} catch {
			return null;
		}
	}

	public async list() {
		try {
			return await this.table.findMany();
		} catch {
			return [];
		}
	}
}
