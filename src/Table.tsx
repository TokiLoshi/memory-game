import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Object3D, Mesh } from "three";

export default function Table() {
	// Refs
	const tableRef = useRef();
	const candleRef = useRef();

	// Models
	const table = useLoader(GLTFLoader, "./models/table.glb");
	const candle = useLoader(GLTFLoader, "./models/candle.gltf");

	// Add shadows to the models
	const traverseObject = (object: Object3D) => {
		if (object instanceof Mesh) {
			object.castShadow = true;
			object.receiveShadow = true;
		}
		if (object.children && object.children.length > 0) {
			object.children.forEach((child) => traverseObject(child));
		}
	};

	// Apply shadows when models are loaded
	useEffect(() => {
		if (table.scene) {
			traverseObject(table.scene);
		}
		if (candle.scene) {
			traverseObject(candle.scene);
		}
	}, []);

	return (
		<>
			<primitive
				object={candle.scene}
				ref={candleRef}
				position={[5.4, 2.7, -0.6]}
				scale={1}
				castShadow
				receiveShadow
			/>
			<primitive
				object={table.scene}
				ref={tableRef}
				position={[2.1, -1.8, -2.2]}
				scale={5}
				rotation={[0, 1.4, 0]}
				castShadow
				receiveShadow
			/>
		</>
	);
}
