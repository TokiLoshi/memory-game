import { useLoader } from "@react-three/fiber";
import { useMatcapTexture } from "@react-three/drei";
import { TextureLoader } from "three";
import { createContext, useContext, useMemo } from "react";

const AssetsContext = createContext<any>(null);

export function Assets({ children }: { children: React.ReactNode }) {
	const [greenMatcapMaterial] = useMatcapTexture(
		"586A51_CCD5AA_8C9675_8DBBB7",
		256
	);
	const [silverMatcapMaterial] = useMatcapTexture(
		"3E2335_D36A1B_8E4A2E_2842A5",
		256
	);
	const [redMatcapMaterial] = useMatcapTexture("4F4C45_A7AEAA_7A8575_9D97A2");
	const deckTexture = useLoader(TextureLoader, "./materials/back.jpg");
	const fontSrc = "/fonts/doto.json";

	// Memoize all assets
	const value = useMemo(
		() => ({
			greenMatcapMaterial,
			silverMatcapMaterial,
			redMatcapMaterial,
			deckTexture,
			fontSrc,
		}),
		[
			greenMatcapMaterial,
			silverMatcapMaterial,
			redMatcapMaterial,
			deckTexture,
			fontSrc,
		]
	);
	return (
		<AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>
	);
}

export const useAssets = () => useContext(AssetsContext);
