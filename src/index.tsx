import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Leva } from "leva";
import Game from "./Game";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Leva collapsed={true} />
		<Game />
	</StrictMode>
);
