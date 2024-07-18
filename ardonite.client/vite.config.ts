import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { env } from "node:process";
import { URL, fileURLToPath } from "node:url";
import MillionCompiler from "@million/lint";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const baseFolder =
	env.APPDATA !== undefined && env.APPDATA !== ""
		? `${env.APPDATA}/ASP.NET/https`
		: `${env.HOME}/.aspnet/https`;

const certificateName = "ardonite.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
	if (
		0 !==
		child_process.spawnSync(
			"dotnet",
			[
				"dev-certs",
				"https",
				"--export-path",
				certFilePath,
				"--format",
				"Pem",
				"--no-password",
			],
			{ stdio: "inherit" },
		).status
	) {
		throw new Error("Could not create certificate.");
	}
}

const target = env.ASPNETCORE_HTTPS_PORT
	? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
	: env.ASPNETCORE_URLS
		? env.ASPNETCORE_URLS.split(";")[0]
		: "https://localhost:7072";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		MillionCompiler.vite(),
		TanStackRouterVite(),
		tsconfigPaths({ root: "./" }),
		react(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		proxy: {
			"^/weatherforecast": {
				target,
				secure: false,
			},
		},
		port: 5173,
		https: {
			key: fs.readFileSync(keyFilePath),
			cert: fs.readFileSync(certFilePath),
		},
	},
});
