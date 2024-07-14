import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { GameMachineContext } from "./lib/game/machine";

const root = document.getElementById("root");

if (root) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<GameMachineContext.Provider>
				<App />
			</GameMachineContext.Provider>
		</React.StrictMode>,
	);
}
