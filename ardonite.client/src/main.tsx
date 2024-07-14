import "./index.css";

import { router } from "@/lib/router.ts";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}
