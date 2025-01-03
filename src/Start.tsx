import { useGameStore } from "./Gamestore";
import { Mesh } from "three";
import { Float, Text3D } from "@react-three/drei";
import { useRef } from "react";
import { Texture } from "three";

type StartProps = {
	material: Texture;
	font: string;
	texture: Texture;
};

export default function Start({ material, font, texture }: StartProps) {
	const startGame = useGameStore((state) => state.startGame);

	// Refs
	const titleRef = useRef<Mesh>(null!);
	const startRef = useRef<Mesh>(null!);

	const handleStart = () => {
		startGame();
	};

	return (
		<>
			<Float floatIntensity={0.75} rotationIntensity={0.15}>
				<Text3D
					font={font}
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
					castShadow
					ref={titleRef}>
					<meshMatcapMaterial matcap={material} />
					Magic Memory
				</Text3D>
				<Text3D
					font={font}
					position={[0, 4.7, -0.7]}
					size={0.75}
					height={0.2}
					curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={5}
					castShadow
					onClick={handleStart}
					onPointerOver={() => (document.body.style.cursor = "grab")}
					onPointerOut={() => (document.body.style.cursor = "default")}
					ref={startRef}>
					<meshMatcapMaterial matcap={material} />
					Start
				</Text3D>
			</Float>
			<mesh
				position={[0, 2.3, -2]}
				onPointerOver={() => (document.body.style.cursor = "grab")}
				onPointerOut={() => (document.body.style.cursor = "default")}
				onClick={handleStart}>
				<boxGeometry args={[1, 0.04, 1.5]} />
				<meshStandardMaterial map={texture} />
			</mesh>
		</>
	);
}
