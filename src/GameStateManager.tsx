import { useLoader } from "@react-three/fiber";
import { useMatcapTexture } from "@react-three/drei";
import { TextureLoader } from "three";
import { useGameStore } from "./Gamestore";
import Start from "./Start";
import Experience from "./Experience";
import EndScene from "./End";

export default function GameStateManager() {
	const gameState = useGameStore((state) => state.gameState);
	const [greenMatcapMaterial] = useMatcapTexture(
		"586A51_CCD5AA_8C9675_8DBBB7",
		256
	);
	const deckTexture = useLoader(TextureLoader, "./materials/back.jpg");
	const fontSrc = "/fonts/doto.json";

	return (
		<>
			{gameState === "START" && (
				<Start
					material={greenMatcapMaterial}
					font={fontSrc}
					texture={deckTexture}
				/>
			)}
			{gameState === "PLAYING" && <Experience level={16} />}
			{gameState === "GAME_OVER" && <EndScene />}
		</>
	);
}
