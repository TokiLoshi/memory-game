import { v4 as uuid4 } from "uuid";

interface Card {
	id: string;
	frontTexture: string;
	flippable: boolean;
	isMatched: boolean;
	showFront: boolean;
}

export const calculateGrid = (
	index: number,
	gridSize: number,
	spacing: number
): [number, number, number] => {
	const row = Math.floor(index / gridSize);
	const col = index % gridSize;

	const gridOffset = ((gridSize - 1) * spacing) / 2;
	const tableX = 1.4;
	const tableY = -1.8 + 8;

	const x = tableX + col * spacing - gridOffset;
	const y = tableY + (row * spacing - gridOffset);
	const z = -2.2;
	return [x, y, z];
};

export const shuffleCards = (
	level: number,
	frontTexturePaths: string[]
): Card[] => {
	const cards: Card[] = Array.from({ length: level / 2 }, (_, index) => {
		const texture = frontTexturePaths[index % frontTexturePaths.length];
		return [
			{
				id: uuid4(),
				frontTexture: texture,
				flippable: false,
				isMatched: false,
				showFront: false,
			},

			{
				id: uuid4(),
				frontTexture: texture,
				flippable: false,
				isMatched: false,
				showFront: false,
			},
		];
	}).flat();

	for (let i = cards.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
	}

	return cards;
};
