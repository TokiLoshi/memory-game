import { useMatcapTexture } from "@react-three/drei";
import { useGameStore } from "./Gamestore";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Start from "./Start";
import CardPlay from "./CardPlay";
import EndScene from "./End";
import Table from "./Table";

export default function Game() {
	const gameState = useGameStore((state) => state.gameState);
	const [greenMatcapMaterial] = useMatcapTexture(
		"586A51_CCD5AA_8C9675_8DBBB7",
		256
	);
	// const greenMatcapMaterial = "green";
	// const [silverMatcapMaterial] = useMatcapTexture(
	// 	"3E2335_D36A1B_8E4A2E_2842A5",
	// 	256
	// );
	// const [redMatcapMaterial] = useMatcapTexture("4F4C45_A7AEAA_7A8575_9D97A2");
	const deckTexture = useLoader(TextureLoader, "./materials/back.jpg");
	const fontSrc = "/fonts/doto.json";
	// const fontSrc = "/bebas-neue-v9-latin-regular.woff";
	return (
		<>
			<group>
				<Table />
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
						material1={greenMatcapMaterial}
						material2={greenMatcapMaterial}
						font={fontSrc}
					/>
				)}
			</group>
		</>
	);
}
