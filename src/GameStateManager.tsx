import { useLoader } from "@react-three/fiber";
import { useMatcapTexture } from "@react-three/drei";
import { TextureLoader, Texture } from "three";
import { useGameStore } from "./Gamestore";
import Start from "./Start";
import Experience from "./Experience";
import EndScene from "./End";
import { ReactNode, Suspense, useMemo } from "react";
import { LoadingScreen } from "./Loading";

interface GameAssets {
	greenMatcapMaterial: Texture;
	silverMatcapTexture: Texture;
	redMatcapTexture: Texture;
	deckTexture: Texture;
}

interface AssetLoaderProps {
	children: (assets: GameAssets) => ReactNode;
}

interface GameStateContentProps {
	assets: GameAssets;
}

function AssetLoader({ children }: AssetLoaderProps) {
	const [greenMatcapMaterial] = useMatcapTexture(
		"586A51_CCD5AA_8C9675_8DBBB7",
		256
	);
	const [silverMatcapTexture] = useMatcapTexture(
		"3E2335_D36A1B_8E4A2E_2842A5",
		256
	);
	const [redMatcapTexture] = useMatcapTexture("4F4C45_A7AEAA_7A8575_9D97A2");
	const deckTexture = useLoader(TextureLoader, "./materials/back.jpg");

	// Memoize all assets
	const assets = useMemo(
		() => ({
			greenMatcapMaterial,
			silverMatcapTexture,
			redMatcapTexture,
			deckTexture,
		}),
		[greenMatcapMaterial, silverMatcapTexture, redMatcapTexture, deckTexture]
	);
	return <>{children(assets)}</>;
}

function GameStateContent({ assets }: GameStateContentProps) {
	const gameState = useGameStore((state) => state.gameState);

	const fontSrc = "/fonts/doto.json";

	return (
		<>
			{gameState === "START" && (
				<Start
					material={assets.greenMatcapMaterial}
					font={fontSrc}
					texture={assets.deckTexture}
				/>
			)}
			{gameState === "PLAYING" && (
				<Experience
					level={16}
					texture={assets.greenMatcapMaterial}
					font={fontSrc}
					backTexture={assets.deckTexture}
				/>
			)}
			{gameState === "GAME_OVER" && (
				<EndScene
					material1={assets.silverMatcapTexture}
					material2={assets.redMatcapTexture}
					font={fontSrc}
				/>
			)}
		</>
	);
}

function GameStateWrapper() {
	return (
		<AssetLoader>
			{(assets) => <GameStateContent assets={assets} />}
		</AssetLoader>
	);
}

export default function GameStateManager() {
	return (
		<>
			<Suspense fallback={<LoadingScreen />}>
				<GameStateWrapper />
			</Suspense>
		</>
	);
}
