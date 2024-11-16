import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Float, Text3D, useMatcapTexture } from "@react-three/drei";
import { useGameStore } from "./Gamestore";
import { useControls, folder } from "leva";
import { Object3D, Mesh } from "three";

export default function Table() {
	// Refs
	const tableRef = useRef();
	const candleRef = useRef();
	const titleRef = useRef<Mesh>(null!);
	const startRef = useRef<Mesh>(null!);
	const countRef = useRef<Mesh>(null!);

	// Font Textures
	const [matcapTexture] = useMatcapTexture("586A51_CCD5AA_8C9675_8DBBB7", 256);

	// Models
	const table = useLoader(GLTFLoader, "./models/table.glb");
	const candle = useLoader(GLTFLoader, "./models/candle.gltf");

	// Add shadows to the models
	const traverseCandle = (object: Object3D) => {
		if (object instanceof Mesh) {
			object.castShadow = true;
		}
		if (object.children && object.children.length > 0) {
			object.children.forEach((child) => traverseCandle(child));
		}
	};
	traverseCandle(candle.scene);

	// Game State
	const gameState = useGameStore((state) => state.gameState);
	const moves = useGameStore((state) => state.moves);
	useEffect(() => {}, []);

	// Leva Controls
	const {
		tablePosition,
		candlePosition,
		tableRotation,
		startPosition,
		counterPosition,
	} = useControls({
		table: folder(
			{
				tablePosition: {
					value: [2.1, -1.8, -2.2],
					step: 0.1,
				},
				candlePosition: {
					value: [5.4, 2.7, -0.6],
					step: 0.1,
				},
				tableRotation: {
					value: [0, 1.4, 0],
					step: 0.1,
				},
				startPosition: {
					value: [0, 6.3, -0.7],
					step: 0.1,
				},
				counterPosition: {
					value: [5, 6.3, -0.7],
					step: 0.1,
				},
			},
			{ collapsed: true }
		),
	});

	const handleStart = () => {
		console.log("handle start");
	};

	return (
		<>
			{gameState === "START" && (
				<>
					<Float floatIntensity={0.75} rotationIntensity={0.25}>
						<Text3D
							font='/fonts/doto.json'
							position={[-1, 9, -2.4]}
							size={0.75}
							height={0.2}
							curveSegments={12}
							bevelEnabled
							bevelThickness={0.02}
							bevelSize={0.02}
							bevelOffset={0}
							bevelSegments={5}
							onPointerOver={() => (document.body.style.cursor = "grab")}
							onPointerOut={() => (document.body.style.cursor = "default")}
							onClick={handleStart}
							ref={titleRef}>
							<meshMatcapMaterial matcap={matcapTexture} />
							Memory Game
						</Text3D>
					</Float>
					<Float floatIntensity={0.25} rotationIntensity={0.25}>
						<Text3D
							font='/fonts/doto.json'
							position={startPosition}
							size={0.75}
							height={0.2}
							curveSegments={12}
							bevelEnabled
							bevelThickness={0.02}
							bevelSize={0.02}
							bevelOffset={0}
							bevelSegments={5}
							onPointerOver={() => (document.body.style.cursor = "grab")}
							onPointerOut={() => (document.body.style.cursor = "default")}
							ref={startRef}>
							<meshMatcapMaterial matcap={matcapTexture} />
							Start
						</Text3D>
					</Float>
				</>
			)}
			<primitive
				object={candle.scene}
				ref={candleRef}
				position={candlePosition}
				scale={1}
			/>
			<primitive
				object={table.scene}
				ref={tableRef}
				position={tablePosition}
				scale={5}
				rotation={tableRotation}
			/>
			<Float floatIntensity={0.25} rotationIntensity={0.25}>
				<Text3D
					font='/fonts/doto.json'
					size={0.75}
					height={0.2}
					curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={5}
					ref={countRef}
					position={counterPosition}>
					<meshMatcapMaterial matcap={matcapTexture} />
					{moves}
				</Text3D>
			</Float>
		</>
	);
}
