import pkg from "../../package.json";
import type { LayoutServerLoad } from "./$types";

export const ssr = true;

export const load = (async () => {
	return {
		version: pkg.version
	};
}) satisfies LayoutServerLoad;
