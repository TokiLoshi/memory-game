import Experience from "./Experience";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
} from "@react-three/drei";
import Table from "./Table";
import { useGameStore } from "./Gamestore";
import EndScene from "./End";
import Start from "./Start";
import { Suspense } from "react";
import { LoadingScreen } from "./Loading";
import { Perf } from "r3f-perf";

export default function Game() {
	const gameState = useGameStore((state) => state.gameState);

	return (
		<Canvas shadows>
			<Suspense fallback={<LoadingScreen />}>
				<Perf position='top-left' />
				<PerspectiveCamera
					fov={75}
					near={0.1}
					far={300}
					position={[0.1, 4.5, 3.1]}
				/>
				<Environment
					files='./envMaps/library.jpg'
					background
					ground={{
						height: 7,
						radius: 28,
						scale: 100,
					}}
					resolution={256}
				/>
				<OrbitControls
					makeDefault={true}
					minDistance={5}
					maxDistance={20}
					minPolarAngle={Math.PI / 4}
					maxPolarAngle={Math.PI / 2}
					target={[0.1, 4.5, 3.1]}
					dampingFactor={0.05}
				/>
				<ambientLight intensity={0.5} />
				<directionalLight
					position={[10, 10, 10]}
					intensity={1}
					castShadow
					shadow-mapSize={[512, 512]}
				/>
				<Table />
				<mesh rotation-x={-Math.PI * 0.5} position-y={-0.001} receiveShadow>
					<planeGeometry args={[50, 50]} />
					<shadowMaterial transparent opacity={0.4} />
				</mesh>
				{gameState === "START" && <Start />}
				{gameState === "PLAYING" && <Experience level={16} />}
				{gameState === "GAME_OVER" && <EndScene />}
			</Suspense>
		</Canvas>
	);
}
