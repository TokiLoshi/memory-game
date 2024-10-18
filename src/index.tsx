import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Experience from "./Experience";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Canvas
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [2.5, 4, 6],
			}}>
			<OrbitControls />
			<ambientLight intensity={0.5} />
			<directionalLight position={[4, 4, 1]} />
			<Experience level={16} />
		</Canvas>
	</StrictMode>
);
