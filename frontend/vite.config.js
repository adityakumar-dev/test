import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
	build: {
		// Increase warning threshold or tune as appropriate
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
							return "react-vendor";
						}
						if (id.includes("axios")) return "axios";
						if (id.includes("zustand")) return "zustand";
						return "vendor";
					}
				},
			},
		},
	},
});
