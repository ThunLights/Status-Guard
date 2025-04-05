import { defineConfig } from "@trigger.dev/sdk/v3";
import { config } from "dotenv";

config();

const project = process.env["TRIGGER_PROJECT"];

if (!project) {
	throw new Error("TRIGGER_PROJECT not found");
}

export default defineConfig({
	project,
	runtime: "node",
	logLevel: "log",
	maxDuration: 3600
});
