import { Float, Text3D } from "@react-three/drei";
import { useGameStore } from "./Gamestore";
import { Texture } from "three";

type EndProps = {
	material1: Texture;
	material2: Texture;
	font: string;
};

export default function EndScene({ material1, material2, font }: EndProps) {
	const moves = useGameStore((state) => state.moves);
	const reset = useGameStore((state) => state.resetGame);

	const handleReset = () => {
		reset();
	};

	return (
		<>
			<Float floatIntensity={0.25} rotationIntensity={0.25}>
				<Text3D
					font={font}
					size={0.75}
					height={0.1}
					// curveSegments={12}
					bevelEnabled
					bevelThickness={0.01}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={1}
					position={[-0.8, 8.3, -0.7]}>
					<meshMatcapMaterial matcap={material1} />
					GAME OVER
				</Text3D>
				<Text3D
					font={font}
					size={0.5}
					height={0.2}
					// curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={2}
					position={[0, 6.3, -0.7]}>
					<meshMatcapMaterial matcap={material2} />
					{moves} guesses
				</Text3D>
				<Text3D
					font={font}
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
					<meshMatcapMaterial matcap={material2} />
					Reset
				</Text3D>
			</Float>
		</>
	);
}
