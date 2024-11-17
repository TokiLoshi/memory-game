import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useControls, folder } from "leva";
import { Object3D, Mesh } from "three";

export default function Table() {
	// Refs
	const tableRef = useRef();
	const candleRef = useRef();

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

	useEffect(() => {}, []);

	// Leva Controls
	const { tablePosition, candlePosition, tableRotation } = useControls({
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
			},
			{ collapsed: true }
		),
	});

	return (
		<>
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
		</>
	);
}
