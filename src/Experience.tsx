import "./style.css";
import Card from "./Card";
import { v4 as uuid4 } from "uuid";
import { useState, useEffect } from "react";

interface Card {
	id: string;
	frontTexture: string;
	flippable: boolean;
}

const frontTexturePaths = [
	"./materials/1.jpg",
	"./materials/2.jpg",
	"./materials/3.jpg",
	"./materials/4.jpg",
	"./materials/5.jpg",
	"./materials/6.jpg",
	"./materials/7.jpg",
	"./materials/8.jpg",
	"./materials/9.jpg",
	"./materials/10.jpg",
	"./materials/11.jpg",
	"./materials/12.jpg",
	"./materials/13.jpg",
	"./materials/14.jpg",
	"./materials/15.jpg",
	"./materials/16.jpg",
];

const calculateGrid = (
	index: number,
	gridSize: number,
	spacing: number
): [number, number, number] => {
	const row = Math.floor(index / gridSize);
	const col = index % gridSize;
	const x = (col - gridSize / 2) * spacing;
	const y = (row - gridSize / 2) * spacing;
	return [x, y, 0];
};

// Shuffle code using Fisher-yates: https://javascript.plainenglish.io/building-a-card-memory-game-in-react-e6400b226b8f
const swap = (cards: Card[], i: number, j: number) => {
	const temp = cards[i];
	cards[i] = cards[j];
	cards[j] = temp;
};

const shuffleCards = (level: number, frontTexturePaths: string[]) => {
	const cards = Array.from({ length: level / 2 }, (_, index) => {
		const texture = frontTexturePaths[index % frontTexturePaths.length];
		return [
			{ id: uuid4(), frontTexture: texture, flippable: false },
			{ id: uuid4(), frontTexture: texture, flippable: false },
		];
	}).flat();

	for (let i = cards.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		swap(cards, i, randomIndex);
	}

	return cards;
};

function Experience({ level = 16 }) {
	const gridSize = Math.sqrt(level);
	const cardMargin = 1.8;
	const [cards, setCards] = useState(shuffleCards(level, frontTexturePaths));
	const backpath = "./materials/back.jpg";
	const [firstCard, setFirstCard] = useState<string | undefined>();
	const [secondCard, setSecondCard] = useState<string | undefined>();
	const [flippedCards, setFlippedCards] = useState<string[]>([]);

	const onClick = (id: string, path: string) => {
		console.log(`First card: ${firstCard} second card: ${secondCard}`);

		if (!flippedCards.includes(id)) {
			setFlippedCards((prev) => [...prev, id]);

			setCards((prevCards) =>
				prevCards.map((card) =>
					card.id === id ? { ...card, flippable: true } : card
				)
			);
		}

		console.log(`Card with id ${id} clicked, ${path}`);

		if (!firstCard) {
			setFirstCard(path);
			console.log(`Set first card as: ${path}`);
		} else if (!secondCard) {
			setSecondCard(path);
			console.log(`Set second card as: ${path}`);
		}
	};
	useEffect(() => {
		if (firstCard && secondCard) {
			console.log(
				`Firstcard: ${firstCard} second ${secondCard} and ${
					firstCard === secondCard
				}`
			);
			if (firstCard === secondCard) {
				console.log("MAthcy Matchy");
			} else {
				console.log("Not matchy matchy");
				setTimeout(() => {
					resetCards();
				}, 1000);
			}
		}
	}, [firstCard, secondCard]);

	const resetCards = () => {
		console.log("Resetting cards");
		setFirstCard(undefined);
		setSecondCard(undefined);
		// setFlippedCards([]);
	};

	return (
		<>
			{cards.map((card, index) => (
				<Card
					key={card.id}
					frontTexture={card.frontTexture}
					onClick={() => onClick(card.id, card.frontTexture)}
					flippable={card.flippable}
					backTexture={backpath}
					position={calculateGrid(index, gridSize, cardMargin)}
				/>
			))}
		</>
	);
}

export default Experience;
