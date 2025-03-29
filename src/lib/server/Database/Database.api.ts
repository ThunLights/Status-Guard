import { _prisma } from "./index";

export class Api {
	private readonly table = _prisma.api;

	public async fetchAll(domain: string) {
		try {
			return await this.table.findMany({ where: { domain } });
		} catch {
			return [];
		}
	}
}
