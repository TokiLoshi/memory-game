import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
	Text,
	Float,
	Text3D,
	useMatcapTexture,
	Center,
} from "@react-three/drei";
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
					value: [5.4, 2.7, -4.1],
					step: 0.1,
				},
				tableRotation: {
					value: [0, 1.4, 0],
					step: 0.1,
				},
				startPosition: {
					value: [-1.4, 9.3, -2.4],
					step: 0.1,
				},
				counterPosition: {
					value: [5.4, 6.4, -3.7],
					step: 0.1,
				},
			},
			{ collapsed: true }
		),
	});
	const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
	const titleRef = useRef<Mesh>(null!);
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
							ref={titleRef}>
							<meshMatcapMaterial matcap={matcapTexture} />
							Hello Doto
						</Text3D>
					</Float>
					<Float floatIntensity={0.25} rotationIntensity={0.25}>
						<Text
							scale={1}
							position={startPosition}
							rotation-y={0.25}
							color='black'
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
					position={counterPosition}
					rotation-y={0.25}
					color='orange'
					maxWidth={0.25}>
					{moves}
				</Text>
			</Float>
		</>
	);
}
