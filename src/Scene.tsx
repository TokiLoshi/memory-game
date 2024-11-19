import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
	// PerspectiveCamera,
} from "@react-three/drei";
import Table from "./Table";
// import GameStateManager from "./GameStateManager";
// import { GameProvider } from "./GameProvider";
// import Floor from "./Floor";
import { GameStates } from "./GameStates";
import { Suspense } from "react";

export function Scene() {
	return (
		<>
			{/* <GameProvider> */}
			{/* <PerspectiveCamera
					fov={75}
					near={0.1}
					far={300}
					position={[0.1, 4.5, 3.1]}
				/> */}
			<Suspense fallback={null}>
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
					preset={undefined}
				/>

				<OrbitControls
					makeDefault={true}
					minDistance={4}
					maxDistance={20}
					minPolarAngle={Math.PI / 4}
					maxPolarAngle={Math.PI / 2}
					target={[0.1, 4.5, 3.1]}
					enableDamping={true}
					dampingFactor={0.05}
					// camera={{
					// 	position: [0.1, 4.5, 3.1],
					// 	rotation: [0, Math.PI, 0]
					// }}
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
				<GameStates />
			</Suspense>
			{/* </GameProvider> */}
		</>
	);
}
