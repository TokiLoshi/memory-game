import Start from "./Start";
import Experience from "./CardPlay";
import EndScene from "./End";
import { useGameStore } from "./Gamestore";
import { Suspense } from "react";
import { LoadingScreen } from "./Loading";
import { useAssets } from "./Assets";

export function GameStates() {
	const assets = useAssets();
	const gameState = useGameStore((state) => state.gameState);
	console.log("Assets available: ", assets);

	return (
		<>
			{gameState === "START" && (
				<Suspense fallback={<LoadingScreen />}>
					<Start
						material={assets.greenMatcapMaterial}
						font={assets.fontSrc}
						texture={assets.deckTexture}
					/>
				</Suspense>
			)}
			{gameState === "PLAYING" && (
				<Suspense fallback={<LoadingScreen />}>
					<Experience
						level={16}
						texture={assets.greenMatcapMaterial}
						font={assets.fontSrc}
						backTexture={assets.deckTexture}
					/>
				</Suspense>
			)}
			{gameState === "GAME_OVER" && (
				<Suspense fallback={<LoadingScreen />}>
					<EndScene
						material1={assets.silverMatcap}
						material2={assets.redMatcap}
						font={assets.fontSrc}
					/>
				</Suspense>
			)}
		</>
	);
}
