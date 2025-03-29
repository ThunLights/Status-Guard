import { _prisma } from "./index";

export class Status {
	private readonly table = _prisma.status;

	public async update(domain: string, status: number) {
		try {
			const date = new Date();
			const data = { domain, status, date };
			const element = await this.table.findFirst({ where: { domain, date } });
			if (element) {
				await this.table.update({ where: { domain_date: { domain, date } }, data: { status } });
			} else {
				await this.table.create({ data });
			}
			return data;
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

	public async remove(domain: string, date: Date) {
		try {
			return await this.table.delete({
				where: {
					domain_date: { domain, date }
				}
			});
		} catch {
			return null;
		}
	}
}
