import { TextureLoader, DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";
// import { PivotControls } from "@react-three/drei";

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

	// const { mass, tension, friction, flipAngle, cardRotation } = useControls({
	// 	cards: folder(
	// 		{
	// 			mass: { value: 5, min: 1, max: 10 },
	// 			tension: { value: 500, min: 100, max: 1000 },
	// 			friction: { value: 80, min: 10, max: 200 },
	// 			flipAngle: { value: Math.PI, min: Math.PI / 2, max: Math.PI * 2 },
	// 			cardRotation: { value: [0, 0.0, 0], step: 0.1 },
	// 		},
	// 		{ collapsed: true }
	// 	),
	// });
	const { flipDuration, flipHeight } = useControls({
		flipDuration: {
			value: 1.5,
			min: 0.5,
			max: 3,
			step: 0.1,
		},
		flipHeight: {
			value: 2.5,
			min: 1,
			max: 4,
			step: 0.1,
		},
	});

	// const baseRotation = [-Math.PI / 2, 1, 0];

	// const getFlipRotation = (isFlipped: boolean) => {
	// 	if (inDeck) {
	// 		return baseRotation;
	// 	} else if (isFlipped) {
	// 		return baseRotation[0];
	// 	} else {
	// 		return baseRotation;
	// 	}
	// };

	// const { rotation, pos } = useSpring({
	// 	rotation: getFlipRotation(flippable) ? [0, flipAngle, 0] : cardRotation,
	// 	pos: inDeck
	// 		? [deckPosition[0], deckPosition[1] + index * 0.001, deckPosition[2]]
	// 		: position,
	// 	config: { mass, tension, friction, delay: inDeck ? 0 : index * 100 },
	// });

	const { rotation, position: animatedPosition } = useSpring({
		rotation: flippable ? [0, Math.PI, 0] : [0, 0, 0],
		position: flippable
			? [position[0], position[1] * flipHeight, position[2]]
			: position,
		config: {
			mass: 1,
			tension: 180,
			friction: 12,
			duration: flipDuration * 1000,
		},
	});
	return (
		<animated.mesh
			rotation={rotation as unknown as [number, number, number]}
			position={animatedPosition as unknown as [number, number, number]}
			onClick={onClick}>
			<boxGeometry args={[1, 1.5, 0.01]} />
			<meshStandardMaterial side={DoubleSide} map={flippable ? front : back} />
		</animated.mesh>
	);
}
