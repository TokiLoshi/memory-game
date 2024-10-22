import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";

export default function Table() {
	const tableRef = useRef();
	const candleRef = useRef();
	const table = useLoader(GLTFLoader, "./models/table.glb");
	const candle = useLoader(GLTFLoader, "./models/candle.gltf");
	console.log("table: ", table);
	console.log("candle, ", candle);
	return (
		<>
			<primitive
				object={candle.scene}
				ref={candleRef}
				position={[-1.2, -0.53, 2.2]}
				scale={1}
			/>

			<primitive
				object={table.scene}
				ref={tableRef}
				position={[0, -3, 0]}
				scale={3}
				rotation-x={-0}
			/>
		</>
	);
}
