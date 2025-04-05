import { schedules } from "@trigger.dev/sdk/v3";

import { checkStatus, resetRule } from "../src/lib/server/trigger";

import type { Check } from "../src/lib/server/status";

export type Payload = {
	cache: Map<string, Check>;
};

const lockdownZones = new Map<string, Check>();

export const statusCheckTask = schedules.task({
	id: "status-check",
	cron: {
		pattern: "* * * * *"
	},
	init: async () => {
		await resetRule();
	},
	run: async () => {
		await checkStatus(lockdownZones);
	}
});
