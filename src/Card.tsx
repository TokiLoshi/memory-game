import { useState } from "react";
import { TextureLoader, DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";

interface CardProps {
	frontTexture: string;
	backTexture: string;
	onClick: () => void;
	position: [number, number, number];
}

export default function Card({
	frontTexture,
	onClick,
	backTexture,
	position,
}: CardProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	const front = useLoader(TextureLoader, frontTexture);
	const back = useLoader(TextureLoader, backTexture);

	const { mass, tension, friction, flipAngle } = useControls({
		mass: { value: 5, min: 1, max: 10 },
		tension: { value: 500, min: 100, max: 1000 },
		friction: { value: 80, min: 10, max: 200 },
		flipAngle: { value: Math.PI, min: Math.PI / 2, max: Math.PI * 2 },
	});

	const { rotation } = useSpring({
		rotation: isFlipped ? [0, flipAngle, 0] : [0, 0.3, 0],
		config: { mass, tension, friction },
	});

	return (
		<>
			<animated.mesh
				rotation={rotation as unknown as [number, number, number]}
				position={position}
				onClick={() => {
					onClick();
					setIsFlipped(true);
				}}>
				<boxGeometry args={[1, 1.5, 0.01]} />
				<meshStandardMaterial
					side={DoubleSide}
					map={isFlipped ? front : back}
				/>
			</animated.mesh>
		</>
	);
}
