import { defineConfig } from "@trigger.dev/sdk/v3";
import { project } from "./.trigger.json";

if (!project) {
	throw new Error("TRIGGER_PROJECT not found");
}

export default defineConfig({
	project,
	runtime: "node",
	logLevel: "log",
	maxDuration: 3600
});
