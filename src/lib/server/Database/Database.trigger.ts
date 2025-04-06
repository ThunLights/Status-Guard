import { _prisma } from "./index";

export class Trigger {
	private readonly table = _prisma.trigger;

	public async fetch(domain: string) {
		try {
			return await this.table.findFirst({ where: { domain } });
		} catch {
			return null;
		}
	}

	public async insert(domain: string) {
		try {
			const element = await this.table.findFirst({
				where: { domain }
			});
			if (!element) {
				const limit = new Date(Date.now() + 60 * 60 * 1000);
				return await this.table.create({
					data: { domain, limit }
				});
			}
			return null;
		} catch {
			return null;
		}
	}

	public async deleteExpirrations() {
		try {
			const limit = new Date(Date.now() - 60 * 60 * 1000);
			return await this.table.deleteMany({
				where: {
					limit: {
						lte: limit
					}
				}
			});
		} catch {
			return null;
		}
	}

	public async reset() {
		try {
			return await this.table.deleteMany();
		} catch {
			return null;
		}
	}
}
