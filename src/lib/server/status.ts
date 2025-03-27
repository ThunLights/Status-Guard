import { sleep } from "$lib/sleep";

export type Check = {
	ok: boolean;
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
					content: "ddos"
				};
			}
			if (500 <= response.status) {
				return {
					ok: false,
					content: "5xx"
				};
			}
			if (!response.ok) {
				return {
					ok: false,
					content: "4xx"
				};
			}
			return null;
		} catch {
			return null;
		}
	}
}
