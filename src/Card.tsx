import { useState } from "react";
import { TextureLoader, DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

interface CardProps {
	frontTexture: string;
	backTexture: string;
	onClick: () => void;
}

export default function Card({
	frontTexture,
	onClick,
	backTexture,
}: CardProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	const front = useLoader(TextureLoader, frontTexture);
	const back = useLoader(TextureLoader, backTexture);

	const { rotation } = useSpring({
		rotation: isFlipped ? [0, Math.PI, 0] : [0, 0, 0],
		config: { mass: 5, tension: 500, friction: 80 },
	});
	return (
		<>
			<animated.mesh
				rotation={rotation as unknown as [number, number, number]}
				onClick={() => {
					onClick();
					setIsFlipped(!isFlipped);
				}}>
				<planeGeometry args={[1, 1]} />
				<meshStandardMaterial
					side={DoubleSide}
					map={isFlipped ? front : back}
				/>
			</animated.mesh>
		</>
	);
}
