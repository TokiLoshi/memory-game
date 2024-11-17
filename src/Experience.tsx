import "./style.css";
import Card from "./Card";
import { v4 as uuid4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import { useGameStore } from "./Gamestore";
import { Float, Grid, Text3D, useMatcapTexture } from "@react-three/drei";
import { Mesh } from "three";

interface Card {
	id: string;
	frontTexture: string;
	flippable: boolean;
	isMatched: boolean;
	showFront: boolean;
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

	const gridOffset = ((gridSize - 1) * spacing) / 2;
	const tableX = 1.4;
	const tableY = -1.8 + 8;

	const x = tableX + col * spacing - gridOffset;
	const y = tableY + (row * spacing - gridOffset);
	const z = -2.2;
	return [x, y, z];
};

// Shuffle code using Fisher-yates: https://javascript.plainenglish.io/building-a-card-memory-game-in-react-e6400b226b8f
const swap = (cards: Card[], i: number, j: number) => {
	const temp = cards[i];
	cards[i] = cards[j];
	cards[j] = temp;
};

const shuffleCards = (level: number, frontTexturePaths: string[]): Card[] => {
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
		swap(cards, i, randomIndex);
	}

	return cards;
};

function Experience({ level = 16 }) {
	// Set grid size based on user selected level
	const gridSize = Math.sqrt(level);
	const cardMargin = 1.8;
	const backTexture = "./materials/back.jpg";

	const flipDuration = 1500;

	// Set Card Properties
	const [cards, setCards] = useState(shuffleCards(level, frontTexturePaths));
	const [firstCard, setFirstCard] = useState<Card | null>();
	const [secondCard, setSecondCard] = useState<Card | null>();
	const [isProcessing, setIsProcessing] = useState(false);
	const [score, setScore] = useState(0);

	// Game state
	const gameState = useGameStore((state) => state.gameState);
	console.log("State in experience: ", gameState);
	const moves = useGameStore((state) => state.moves);
	const incrementMoves = useGameStore((state) => state.incrementMoves);
	const endGame = useGameStore((state) => state.endGame);

	const handleCardClick = (clickedCard: Card) => {
		if (
			isProcessing ||
			clickedCard.isMatched ||
			clickedCard.flippable ||
			(firstCard && secondCard) ||
			firstCard?.id === clickedCard.id
		) {
			return;
		}

		console.log(`Moves: ${moves}`);

		setCards((prevCards) =>
			prevCards.map((card) =>
				card.id == clickedCard.id ? { ...card, flippable: true } : card
			)
		);

		// Show front side midway through the flip
		setTimeout(() => {
			setCards((prevCards) =>
				prevCards.map((card) =>
					card.id === clickedCard.id ? { ...card, showFront: true } : card
				)
			);
		}, flipDuration / 2);

		if (!firstCard) {
			setFirstCard(clickedCard);
		} else {
			setSecondCard(clickedCard);
		}
	};

	useEffect(() => {
		if (firstCard && secondCard) {
			setIsProcessing(true);
			incrementMoves();
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
					// Hide front texture halfway through
					setTimeout(() => {
						setCards((prevCards) =>
							prevCards.map((card) =>
								card.id === firstCard.id || card.id === secondCard.id
									? { ...card, showFront: false }
									: card
							)
						);
					}, flipDuration / 2);
					resetCards();
				}, flipDuration + 500);
			}
		}
	}, [firstCard, secondCard, incrementMoves]);

	const resetCards = () => {
		console.log("Resetting cards");
		setFirstCard(null);
		setSecondCard(null);
		setIsProcessing(false);
	};
	useEffect(() => {
		if (score === level / 2) {
			console.log("Game complete");
			endGame();
		}
	}, [score, level, moves, endGame]);
	const countRef = useRef<Mesh>(null!);
	const [matcapTexture] = useMatcapTexture("586A51_CCD5AA_8C9675_8DBBB7", 256);

	return (
		<>
			{gameState == "PLAYING" && (
				<Float floatIntensity={0.25} rotationIntensity={0.25}>
					<Text3D
						font='/fonts/doto.json'
						size={0.5}
						height={0.1}
						// curveSegments={12}
						bevelEnabled
						bevelThickness={0.01}
						bevelSize={0.02}
						bevelOffset={0}
						bevelSegments={2}
						position={[4.3, 7.3, -0.7]}
						ref={countRef}>
						<meshMatcapMaterial matcap={matcapTexture} />
						Guess#:
					</Text3D>
					<Text3D
						font='/fonts/doto.json'
						size={0.75}
						height={0.2}
						curveSegments={12}
						bevelEnabled
						bevelThickness={0.02}
						bevelSize={0.02}
						bevelOffset={0}
						bevelSegments={5}
						position={[5, 6.3, -0.7]}
						ref={countRef}>
						<meshMatcapMaterial matcap={matcapTexture} />
						{moves}
					</Text3D>
				</Float>
			)}
			<Grid
				args={[20, 20]}
				cellSize={1}
				cellThickness={1}
				cellColor='#6f6f6f'
				sectionSize={3}
				sectionThickness={1.5}
				sectionColor='#9d4b3b'
				fadeDistance={30}
				fadeStrength={1}
				followCamera={false}
				infiniteGrid={true}
			/>

			{cards.map((card, index) => (
				<Card
					key={card.id}
					frontTexture={card.frontTexture}
					onClick={() => handleCardClick(card)}
					flippable={card.flippable}
					backTexture={backTexture}
					showFront={card.showFront}
					position={calculateGrid(index, gridSize, cardMargin)}
					// index={index}
				/>
			))}
		</>
	);
}

export default Experience;
