import { useMatcapTexture } from "@react-three/drei";
import { useGameStore } from "./Gamestore";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Start from "./Start";
import CardPlay from "./CardPlay";
import EndScene from "./End";

export default function Game() {
	const gameState = useGameStore((state) => state.gameState);
	const [greenMatcapMaterial] = useMatcapTexture("586A51_CCD5AA_8C9675_8DBBB7");
	const [redMatcapMaterial] = useMatcapTexture("4F4C45_A7AEAA_7A8575_9D97A2");
	const deckTexture = useLoader(TextureLoader, "./materials/back.jpg");
	const fontSrc = "/fonts/doto.json";

	return (
		<>
			<group>
				{gameState === "START" && (
					<Start
						material={greenMatcapMaterial}
						font={fontSrc}
						texture={deckTexture}
					/>
				)}
				{gameState === "PLAYING" && (
					<CardPlay
						level={16}
						texture={greenMatcapMaterial}
						font={fontSrc}
						backTexture={deckTexture}
					/>
				)}
				{gameState === "GAME_OVER" && (
					<EndScene
						material1={redMatcapMaterial}
						material2={greenMatcapMaterial}
						font={fontSrc}
					/>
				)}
			</group>
		</>
	);
}
