import { createContext, useContext, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { useMatcapTexture } from "@react-three/drei";
import { TextureLoader } from "three";

const GameAssetsContext = createContext(null);

export function GameProvider({ children }) {
	return (
		<GameAssetsContext.Provider value={assets}>
			{children}
		</GameAssetsContext.Provider>
	);
}

export const useGameAssets = () => useContext(GameAssetsContext);
