import { useControls, folder } from "leva";
import Experience from "./Experience";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
} from "@react-three/drei";
import Table from "./Table";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
// import { PresentationControls } from "@react-three/drei";

export default function Game() {
	const {
		cameraPosition,
		cameraTarget,
		fov,
		ambientLight,
		directionalLight,
		level,
	} = useControls({
		camera: folder(
			{
				cameraPosition: {
					value: [0.1, 4.5, 3.1],
					step: 0.1,
				},
				cameraTarget: {
					value: [0.1, 4.5, 3.1],
					step: 0.1,
				},
				fov: {
					value: 75,
					min: 30,
					max: 90,
				},
			},
			{ collapsed: true }
		),

		lighting: folder(
			{
				ambientLight: {
					value: 0.5,
					min: 0.1,
					max: 5,
					step: 0.1,
				},
				directionalLight: {
					value: [10, 10, 10],
				},
			},
			{ collapsed: true }
		),
		game: folder(
			{
				level: {
					value: 16,
					min: 4,
					max: 16,
					step: 1,
				},
			},
			{ collapsed: true }
		),
	});
	const cameraRef = useRef<Mesh>(null!);
	// useEffect(() => {
	// 	if (cameraRef.current) {
	// 		cameraRef.current.position.set(...cameraPosition);
	// 		cameraRef.current.lookAt(...cameraTarget);
	// 	}
	// });

	return (
		<Canvas shadows>
			<PerspectiveCamera
				ref={cameraRef}
				fov={fov}
				near={0.1}
				far={300}
				position={cameraPosition}
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
				target={cameraTarget}
				dampingFactor={0.05}
			/>
			<ambientLight intensity={ambientLight} />
			<directionalLight
				position={directionalLight}
				intensity={1}
				castShadow
				shadow-mapSize={[512, 512]}
			/>
			<Experience level={level} />
			<Table />
		</Canvas>
	);
}
