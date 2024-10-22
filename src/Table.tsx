import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Text, Float } from "@react-three/drei";
import { useGameStore } from "./Gamestore";
import { useControls, folder } from "leva";

export default function Table() {
	const tableRef = useRef();
	const candleRef = useRef();
	const table = useLoader(GLTFLoader, "./models/table.glb");
	const candle = useLoader(GLTFLoader, "./models/candle.gltf");
	const gameState = useGameStore((state) => state.gameState);
	const { tablePosition, candlePosition, tableRotation } = useControls({
		table: folder(
			{
				tablePosition: {
					value: [0, -3, 0],
					step: 0.1,
				},
				candlePosition: {
					value: [-1.2, -0.53, 2.2],
					step: 0.1,
				},
				tableRotation: {
					value: [0, 0, 0],
					step: 0.1,
				},
			},
			{ collapsed: true }
		),
	});
	return (
		<>
			{gameState === "START" && (
				<Float floatIntensity={0.25} rotationIntensity={0.25}>
					<Text
						scale={1}
						position={[1.75, 3.2, 0]}
						rotation-y={0.25}
						color='lime'
						maxWidth={0.25}>
						Start
					</Text>
				</Float>
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
				scale={3}
				rotation={tableRotation}
			/>
		</>
	);
}
