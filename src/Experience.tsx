import "./style.css";
import Card from "./Card";
import { v4 as uuid4 } from "uuid";

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

function Experience({ level = 15 }) {
	const gridSize = Math.sqrt(level);
	console.log(`Grid size: ${gridSize}`);
	const cardMargin = 1.8;
	const cards = Array.from({ length: level }, (_, index) => ({
		id: uuid4(),
		frontTexture: frontTexturePaths[index % frontTexturePaths.length],
	}));
	const backpath = "./materials/back.jpg";
	const onClick = (id: string) => {
		console.log(`Card with id ${id} clicked`);
	};

	return (
		<>
			{cards.map((card, index) => (
				<Card
					key={card.id}
					frontTexture={card.frontTexture}
					onClick={() => onClick(card.id)}
					backTexture={backpath}
					position={calculateGrid(index, gridSize, cardMargin)}
				/>
			))}
		</>
	);
}

export default Experience;
