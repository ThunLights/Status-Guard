import { sleep } from "$lib/sleep";

export type Check = {
	ok: boolean;
	status: number;
	content: string;
};

export class Status {
	public static async check(url: string, options?: RequestInit): Promise<Check | null> {
		try {
			const response = await fetch(url, {
				...{
					method: "GET"
				},
				...options
			});
			if (response.ok) {
				return {
					ok: true,
					status: response.status,
					content: "success"
				};
			}
			if (response.status === 429) {
				await sleep(3 * 1000);
				return await this.check(url, options);
			}
			if (response.status === 408) {
				return {
					ok: false,
					status: response.status,
					content: "ddos"
				};
			}
			if (500 <= response.status) {
				return {
					ok: false,
					status: response.status,
					content: "5xx"
				};
			}
			if (!response.ok) {
				return {
					ok: false,
					status: response.status,
					content: "4xx"
				};
			}
			return null;
		} catch {
			return null;
		}
	}
}
