import "./style.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { LoadingScreen } from "./Loading";
import { Perf } from "r3f-perf";
import { SceneWrapper } from "./SceneWrapper";

export default function Game() {
	return (
		<Canvas
			shadows
			gl={{ powerPreference: "default", antialias: false }}
			// frameloop='demand'
		>
			<Suspense fallback={<LoadingScreen />}>
				<Perf position='top-left' />
				<SceneWrapper />
			</Suspense>
		</Canvas>
	);
}
