import { task } from "@trigger.dev/sdk/v3";

import { resetRule } from "../src/lib/server/trigger";

export const initialize = task({
	id: "initialize",
	run: async () => {
		await resetRule();
		console.log("initialized");
	}
});
