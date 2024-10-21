import { TextureLoader, DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";

interface CardProps {
	frontTexture: string;
	backTexture: string;
	flippable: boolean;
	onClick: () => void;
	position: [number, number, number];
}

export default function Card({
	frontTexture,
	backTexture,
	onClick,
	flippable,
	position,
}: CardProps) {
	const front = useLoader(TextureLoader, frontTexture);
	const back = useLoader(TextureLoader, backTexture);

	const { mass, tension, friction, flipAngle } = useControls({
		mass: { value: 5, min: 1, max: 10 },
		tension: { value: 500, min: 100, max: 1000 },
		friction: { value: 80, min: 10, max: 200 },
		flipAngle: { value: Math.PI, min: Math.PI / 2, max: Math.PI * 2 },
	});

	const { rotation } = useSpring({
		rotation: flippable ? [0, flipAngle, 0] : [0, 0.3, 0],
		config: { mass, tension, friction },
	});

	return (
		<>
			<animated.mesh
				rotation={rotation as unknown as [number, number, number]}
				position={position}
				onClick={() => {
					console.log("event in card triggered");
					onClick();
				}}>
				<boxGeometry args={[1, 1.5, 0.01]} />
				<meshStandardMaterial
					side={DoubleSide}
					map={flippable ? front : back}
				/>
			</animated.mesh>
		</>
	);
}
