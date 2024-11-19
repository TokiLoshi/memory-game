import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { StrictMode } from "react";
import { Leva } from "leva";
// import Game from "./Game";
import Experience from "./Experience";
import { PerspectiveCamera } from "@react-three/drei";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
	<StrictMode>
		<Leva hidden={location.hash !== "#debug"} />

		<Canvas
			shadows
			gl={{
				powerPreference: "default",
				// antialias: false, //
			}}>
			<PerspectiveCamera
				fov={75}
				near={0.1}
				far={300}
				position={[0.1, 4.5, 3.1]}
			/>
			<Experience />
		</Canvas>
	</StrictMode>
);
