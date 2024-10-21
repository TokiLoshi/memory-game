import "./style.css";
import Card from "./Card";
import { v4 as uuid4 } from "uuid";
import { useState, useEffect } from "react";

interface Card {
	id: string;
	frontTexture: string;
	flippable: boolean;
	isMatched: boolean;
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
			{ id: uuid4(), frontTexture: texture, flippable: true, isMatched: false },

			{ id: uuid4(), frontTexture: texture, flippable: true, isMatched: false },
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
	const backTexture = "./materials/back.jpg";

	const [cards, setCards] = useState(shuffleCards(level, frontTexturePaths));
	const [firstCard, setFirstCard] = useState<Card | null>();
	const [secondCard, setSecondCard] = useState<Card | null>();
	const [isProcessing, setIsProcessing] = useState(false);
	const [score, setScore] = useState(0);
	const [moves, setMoves] = useState(0);

	const handleCardClick = (clickedCard: Card) => {
		setMoves(moves + 1);
		if (
			isProcessing ||
			clickedCard.isMatched ||
			clickedCard.flippable ||
			(firstCard && secondCard) ||
			firstCard?.id === clickedCard.id
		) {
			return;
		}
		setCards((prevCards) =>
			prevCards.map((card) =>
				card.id == clickedCard.id ? { ...card, flippable: true } : card
			)
		);
		if (!firstCard) {
			setFirstCard(clickedCard);
		} else {
			setSecondCard(clickedCard);
		}
	};

	// const onClick = (id: string, path: string) => {
	// 	console.log(`First card: ${firstCard} second card: ${secondCard}`);

	// 	if (!flippedCards.includes(id)) {
	// 		setFlippedCards((prev) => [...prev, id]);

	// 		setCards((prevCards) =>
	// 			prevCards.map((card) =>
	// 				card.id === id ? { ...card, flippable: true } : card
	// 			)
	// 		);
	// 	}

	// 	console.log(`Card with id ${id} clicked, ${path}`);

	// 	if (!firstCard) {
	// 		setFirstCard(path);
	// 		console.log(`Set first card as: ${path}`);
	// 	} else if (!secondCard) {
	// 		setSecondCard(path);
	// 		console.log(`Set second card as: ${path}`);
	// 	}
	// };
	useEffect(() => {
		if (firstCard && secondCard) {
			setIsProcessing(true);

			if (firstCard.frontTexture === secondCard.frontTexture) {
				console.log("match Found");
				setCards((prevCards) =>
					prevCards.map((card) =>
						card.id === firstCard.id || card.id === secondCard.id
							? { ...card, isMatched: true }
							: card
					)
				);
				setScore((prev) => prev + 1);
				resetCards();
			} else {
				console.log("Not matchy matchy");
				setTimeout(() => {
					setCards((prevCards) =>
						prevCards.map((card) =>
							card.id === firstCard.id || card.id === secondCard.id
								? { ...card, flippable: false }
								: card
						)
					);
					resetCards();
				}, 1000);
			}
		}
	}, [firstCard, secondCard]);

	const resetCards = () => {
		console.log("Resetting cards");
		setFirstCard(null);
		setSecondCard(null);
		setIsProcessing(false);
		// setFlippedCards([]);
	};
	useEffect(() => {
		if (score === level / 2) {
			console.log("Game complete");
		}
	}, [score, level, moves]);

	return (
		<>
			{cards.map((card, index) => (
				<Card
					key={card.id}
					frontTexture={card.frontTexture}
					onClick={() => handleCardClick(card)}
					flippable={card.flippable}
					backTexture={backTexture}
					position={calculateGrid(index, gridSize, cardMargin)}
				/>
			))}
		</>
	);
}

export default Experience;
