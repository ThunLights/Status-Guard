import { _prisma } from "./index";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { Prisma } from "@prisma/client";

export class Status {
	private readonly table = _prisma.status;

	private static get nowDate() {
		const date = new Date();
		return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
	}

	public get nowDate() {
		return Status.nowDate;
	}

	public async fetch<T extends Prisma.StatusFindFirstArgs>(
		args?: Prisma.SelectSubset<T, Prisma.StatusFindFirstArgs<DefaultArgs>>
	) {
		try {
			return await this.table.findFirst(args);
		} catch {
			return null;
		}
	}

	public async update(domain: string, status: number) {
		try {
			const date = Status.nowDate;
			const data = { domain, status: [status], date };
			const element = await this.table.findFirst({ where: { domain, date } });
			if (element) {
				await this.table.update({
					where: { domain_date: { domain, date } },
					data: { status: element.status.concat(status) }
				});
			} else {
				await this.table.create({ data });
			}
			return data;
		} catch {
			return null;
		}
	}

	public async list<T extends Prisma.StatusFindManyArgs>(
		args?: Prisma.SelectSubset<T, Prisma.StatusFindManyArgs<DefaultArgs>>
	) {
		try {
			return await this.table.findMany(args);
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
