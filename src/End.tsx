import { Float, Text3D, useMatcapTexture } from "@react-three/drei";
import { useGameStore } from "./Gamestore";

export default function EndScene() {
	const [matcapTexture] = useMatcapTexture("3E2335_D36A1B_8E4A2E_2842A5", 256);
	const [matcapTexture2] = useMatcapTexture("4F4C45_A7AEAA_7A8575_9D97A2");
	const moves = useGameStore((state) => state.moves);
	const reset = useGameStore((state) => state.resetGame);

	const handleReset = () => {
		console.log("User wants to play again");
		reset();
	};

	return (
		<>
			<Float floatIntensity={0.25} rotationIntensity={0.25}>
				<Text3D
					font='/fonts/doto.json'
					size={0.75}
					height={0.1}
					// curveSegments={12}
					bevelEnabled
					bevelThickness={0.01}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={1}
					position={[-0.8, 8.3, -0.7]}>
					<meshMatcapMaterial matcap={matcapTexture2} />
					GAME OVER
				</Text3D>
				<Text3D
					font='/fonts/doto.json'
					size={0.5}
					height={0.2}
					// curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={2}
					position={[0, 6.3, -0.7]}>
					<meshMatcapMaterial matcap={matcapTexture2} />
					{moves} guesses
				</Text3D>
				<Text3D
					font='/fonts/doto.json'
					size={0.5}
					height={0.2}
					// curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={2}
					onClick={handleReset}
					position={[0, 3.8, -0.2]}>
					<meshMatcapMaterial matcap={matcapTexture} />
					Reset
				</Text3D>
			</Float>
		</>
	);
}
