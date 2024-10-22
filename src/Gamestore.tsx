import { create } from "zustand";

type GameState = "START" | "PLAYING" | "GAME_OVER";

interface GameStore {
	gameState: GameState;
	moves: number;
	// Actions
	startGame: () => void;
	endGame: () => void;
	resetGame: () => void;
	incrementMoves: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
	gameState: "START",
	moves: 0,
	startGame: () =>
		set({
			gameState: "PLAYING",
			moves: 0,
		}),
	endGame: () =>
		set({
			gameState: "GAME_OVER",
		}),
	resetGame: () =>
		set({
			gameState: "START",
			moves: 0,
		}),
	incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),
}));
