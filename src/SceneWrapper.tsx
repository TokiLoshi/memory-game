import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
} from "@react-three/drei";
import Table from "./Table";
import GameStateManager from "./GameStateManager";

export function SceneWrapper() {
	return (
		<>
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
				minDistance={4}
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
			<GameStateManager />
		</>
	);
}
