import {
	Environment,
	// PerspectiveCamera,
} from "@react-three/drei";

export default function GameEnvironment() {
	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight
				position={[10, 10, 10]}
				intensity={1}
				castShadow
				shadow-mapSize={[512, 512]}
			/>
			<Environment
				// files='./envMaps/library.jpg'
				files={[
					"./envMaps/cubeMaps/px.png",
					"./envMaps/cubeMaps/nx.png",
					"./envMaps/cubeMaps/py.png",
					"./envMaps/cubeMaps/ny.png",
					"./envMaps/cubeMaps/pz.png",
					"./envMaps/cubeMaps/nz.png",
				]}
				// files={"./envMaps/StandardCubeMap.png"}
				background
				ground={{
					height: 7,
					radius: 28,
					scale: 100,
				}}
				resolution={256} //
				// preset='warehouse'
			/>
			<mesh rotation-x={-Math.PI * 0.5} position-y={-0.001} receiveShadow>
				<planeGeometry args={[50, 50]} />
				<shadowMaterial transparent opacity={0.4} />
			</mesh>
		</>
	);
}
