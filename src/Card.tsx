import { useState } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

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
	return (
		<>
			<mesh
				onClick={() => {
					onClick();
					setIsFlipped(!isFlipped);
				}}>
				<planeGeometry args={[1, 1]} />
				<meshStandardMaterial map={isFlipped ? front : back} />
			</mesh>
		</>
	);
}
