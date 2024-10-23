import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Text, Float } from "@react-three/drei";
import { useGameStore } from "./Gamestore";
import { useControls, folder } from "leva";
import { Object3D, Mesh } from "three";

export default function Table() {
	const tableRef = useRef();
	const candleRef = useRef();
	const table = useLoader(GLTFLoader, "./models/table.glb");
	const candle = useLoader(GLTFLoader, "./models/candle.gltf");
	console.log(candle);
	const traverseCandle = (object: Object3D) => {
		if (object instanceof Mesh) {
			object.castShadow = true;
		}
		if (object.children && object.children.length > 0) {
			object.children.forEach((child) => traverseCandle(child));
		}
	};
	traverseCandle(candle.scene);

	const gameState = useGameStore((state) => state.gameState);
	const moves = useGameStore((state) => state.moves);
	useEffect(() => {}, []);
	const { tablePosition, candlePosition, tableRotation } = useControls({
		table: folder(
			{
				tablePosition: {
					value: [0, -3, 0],
					step: 0.1,
				},
				candlePosition: {
					value: [-2.6, 1, 2.2],
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
				<>
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
				<Text
					scale={1}
					position={[-1.75, 3.2, 0]}
					rotation-y={0.25}
					color='orange'
					maxWidth={0.25}>
					{moves}
				</Text>
			</Float>
		</>
	);
}
