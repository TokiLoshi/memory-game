import { TextureLoader, DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

interface CardProps {
	frontTexture: string;
	backTexture: string;
	flippable: boolean;
	onClick: () => void;
	position: [number, number, number];
	showFront: boolean;
	isSelected?: boolean;
}

export default function Card({
	frontTexture,
	backTexture,
	onClick,
	showFront,
	flippable,
	position,
}: CardProps) {
	const front = useLoader(TextureLoader, frontTexture);
	const back = useLoader(TextureLoader, backTexture);

	const { rotation } = useSpring({
		rotation: flippable ? [0, Math.PI, 0] : [0, 0, 0],
		config: {
			mass: 1,
			tension: 180,
			friction: 12,
			duration: 1.5 * 1000,
		},
	});
	return (
		<animated.mesh
			castShadow
			rotation={rotation as unknown as [number, number, number]}
			position={position}
			onClick={onClick}>
			<boxGeometry args={[1, 1.5, 0.01]} />
			<meshStandardMaterial side={DoubleSide} map={showFront ? front : back} />
		</animated.mesh>
	);
}
