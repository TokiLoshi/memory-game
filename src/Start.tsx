import { useLoader } from "@react-three/fiber";
import { useGameStore } from "./Gamestore";
import { Mesh, TextureLoader } from "three";
import { Float, Text3D, useMatcapTexture } from "@react-three/drei";
import { useRef } from "react";
import { folder, useControls } from "leva";

export default function Start() {
	const startGame = useGameStore((state) => state.startGame);

	// Refs
	const titleRef = useRef<Mesh>(null!);
	const startRef = useRef<Mesh>(null!);

	// Font Textures
	const [matcapTexture] = useMatcapTexture("586A51_CCD5AA_8C9675_8DBBB7", 256);
	const deckTexture = useLoader(TextureLoader, "./materials/back.jpg");

	const handleStart = () => {
		console.log("handle start");
		startGame();
	};

	const { startPosition } = useControls({
		start: folder(
			{
				startPosition: {
					value: [0, 6.3, -0.7],
					step: 0.1,
				},
			},
			{ collapsed: true }
		),
	});
	return (
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
					onClick={handleStart}
					onPointerOver={() => (document.body.style.cursor = "grab")}
					onPointerOut={() => (document.body.style.cursor = "default")}
					ref={startRef}>
					<meshMatcapMaterial matcap={matcapTexture} />
					Start
				</Text3D>
			</Float>
			<mesh
				position={[0, 2.3, -2]}
				onPointerOver={() => (document.body.style.cursor = "grab")}
				onPointerOut={() => (document.body.style.cursor = "default")}
				onClick={handleStart}>
				<boxGeometry args={[1, 0.04, 1.5]} />
				<meshStandardMaterial map={deckTexture} />
			</mesh>
		</>
	);
}
