import { useControls, folder } from "leva";
import Experience from "./Experience";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Game() {
	const {
		positionX,
		positionY,
		positionZ,
		fov,
		ambientLight,
		directionalLight,
		level,
	} = useControls({
		camera: folder(
			{
				positionX: {
					value: 2.5,
					step: 0.1,
				},
				positionY: {
					value: 4,
					step: 0.1,
				},
				positionZ: {
					value: 6,
					step: 0.1,
				},
				fov: {
					value: 85,
					min: 20,
					max: 90,
				},
				ambientLight: {
					value: 1.5,
					min: 0.3,
					max: 5,
					step: 0.1,
				},
				directionalLight: {
					value: [4, 4, 1],
				},
				level: {
					value: 16,
					min: 4,
					max: 16,
					step: 1,
				},
			},
			{ collapsed: true }
		),
	});
	return (
		<Canvas
			camera={{
				fov: fov,
				near: 0.1,
				far: 200,
				position: [positionX, positionY, positionZ],
			}}>
			{/* <Leva collapsed={true} /> */}
			<OrbitControls />
			<ambientLight intensity={ambientLight} />
			<directionalLight position={directionalLight} />
			<Experience level={level} />
		</Canvas>
	);
}
