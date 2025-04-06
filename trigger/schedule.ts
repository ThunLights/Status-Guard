import { schedules } from "@trigger.dev/sdk/v3";
import { checkStatus } from "../src/lib/server/trigger";

export const statusCheckTask = schedules.task({
	id: "status-check",
	cron: {
		pattern: "* * * * *"
	},
	run: async () => {
		await checkStatus(null);
	}
});
