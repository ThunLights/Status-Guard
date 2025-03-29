import { z } from "zod";

export class Header {
	public static readonly headerSchema = z.record(z.string(), z.string());

	public static parse(data: unknown): z.infer<typeof this.headerSchema> {
		try {
			return this.headerSchema.parse(data);
		} catch {
			return {};
		}
	}
}
