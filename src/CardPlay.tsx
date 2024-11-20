import Card from "./Card";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useGameStore } from "./Gamestore";
import { Float, Text3D } from "@react-three/drei";
import { Mesh, Texture } from "three";
import "./style.css";
import { calculateGrid, shuffleCards } from "./utils";

interface Card {
	id: string;
	frontTexture: string;
	flippable: boolean;
	isMatched: boolean;
	showFront: boolean;
}

type ExperienceProps = {
	texture: Texture;
	level: number | undefined;
	font: string;
	backTexture: Texture;
};

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

const FLIP_DURATION = 1500;
const CARD_MARGIN = 1.8;

export default function CardPlay({
	level = 16,
	texture,
	font,
	backTexture,
}: ExperienceProps) {
	// Game state
	const moves = useGameStore((state) => state.moves);
	const incrementMoves = useGameStore((state) => state.incrementMoves);
	const endGame = useGameStore((state) => state.endGame);

	// Set grid size based on user selected level
	const gridSize = Math.sqrt(level);

	// Set Card Properties
	const [cards, setCards] = useState(() =>
		shuffleCards(level, frontTexturePaths)
	);
	const [firstCard, setFirstCard] = useState<Card | null>();
	const [secondCard, setSecondCard] = useState<Card | null>();
	const [isProcessing, setIsProcessing] = useState(false);
	const [score, setScore] = useState(0);

	const cardPositions = useMemo(
		() =>
			Array.from({ length: level }, (_, index) =>
				calculateGrid(index, gridSize, CARD_MARGIN)
			),
		[level, gridSize]
	);

	const handleCardClick = useCallback(
		(clickedCard: Card) => {
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

			// Show front side midway through the flip
			setTimeout(() => {
				setCards((prevCards) =>
					prevCards.map((card) =>
						card.id === clickedCard.id ? { ...card, showFront: true } : card
					)
				);
			}, FLIP_DURATION / 2);

			if (!firstCard) {
				setFirstCard(clickedCard);
			} else {
				setSecondCard(clickedCard);
			}
		},
		[firstCard, secondCard, isProcessing]
	);

	const resetCards = useCallback(() => {
		setFirstCard(null);
		setSecondCard(null);
		setIsProcessing(false);
	}, []);

	useEffect(() => {
		if (firstCard && secondCard) {
			setIsProcessing(true);
			incrementMoves();

			if (firstCard.frontTexture === secondCard.frontTexture) {
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
				const flipTimeout = setTimeout(() => {
					setCards((prevCards) =>
						prevCards.map((card) =>
							card.id === firstCard.id || card.id === secondCard.id
								? { ...card, flippable: false }
								: card
						)
					);
					// Hide front texture halfway through
					const textureTimeout = setTimeout(() => {
						setCards((prevCards) =>
							prevCards.map((card) =>
								card.id === firstCard.id || card.id === secondCard.id
									? { ...card, showFront: false }
									: card
							)
						);
					}, FLIP_DURATION / 2);

					resetCards();
					return () => clearTimeout(textureTimeout);
				}, FLIP_DURATION + 500);
				return () => clearTimeout(flipTimeout);
			}
		}
	}, [firstCard, secondCard, incrementMoves, resetCards]);

	useEffect(() => {
		if (score === level / 2) {
			const endTimeout = setTimeout(() => {
				endGame();
			}, 2000);
			return () => clearTimeout(endTimeout);
		}
	}, [score, level, endGame]);
	const countRef = useRef<Mesh>(null!);

	return (
		<>
			<Float floatIntensity={0.25} rotationIntensity={0.25}>
				<Text3D
					font={font}
					size={0.5}
					height={0.1}
					// curveSegments={12}
					bevelEnabled
					bevelThickness={0.01}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={1}
					position={[4.2, 7.3, -0.7]}
					ref={countRef}>
					<meshMatcapMaterial matcap={texture} /># Guess:
				</Text3D>
				<Text3D
					font={font}
					size={0.75}
					height={0.2}
					// curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelSize={0.02}
					bevelOffset={0}
					bevelSegments={1}
					position={[5, 6.3, -0.7]}
					ref={countRef}>
					<meshMatcapMaterial matcap={texture} />
					{moves}
				</Text3D>
			</Float>

			{cards.map((card, index) => (
				<Card
					key={card.id}
					frontTexture={card.frontTexture}
					onClick={() => handleCardClick(card)}
					flippable={card.flippable}
					backTexture={backTexture}
					showFront={card.showFront}
					position={cardPositions[index]}
					// index={index}
				/>
			))}
		</>
	);
}
