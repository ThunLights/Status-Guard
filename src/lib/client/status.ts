export type ParsedStatus = "ok" | "unstable" | "error" | "unknown";

export class Status {
	private static parseStatus(content: number): ParsedStatus {
		if (200 <= content && content < 300) {
			return "ok";
		}
		if (400 <= content && content < 500) {
			return "error";
		}
		if (500 <= content) {
			return "error";
		}
		return "unknown";
	}

	private static parseStatuses(contents: ParsedStatus[]): ParsedStatus {
		if (!contents.length) {
			return "unknown";
		}
		const counts: Record<ParsedStatus, number> = {
			ok: 0,
			unstable: 0,
			error: 0,
			unknown: 0
		};
		for (const statusTxt of contents) {
			counts[statusTxt] += 1;
		}
		if (contents.length / 2 <= counts.error) {
			return "error";
		} else if (contents.length / 4 <= counts.error) {
			return "unstable";
		} else {
			return "ok";
		}
	}

	public static parse(contents: number[]): ParsedStatus {
		const data: ParsedStatus[] = [];
		for (const statusCode of contents) {
			data.push(this.parseStatus(statusCode));
		}
		return this.parseStatuses(data);
	}
}
