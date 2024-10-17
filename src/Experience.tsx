import "./style.css";
import Card from "./Card";

function Experience() {
	const backpath = "./materials/back.jpg";
	const frontpath = "./materials/ducky.jpg";
	const onClick = () => {
		console.log("clicked");
	};

	return (
		<>
			<Card frontTexture={frontpath} onClick={onClick} backTexture={backpath} />
		</>
	);
}

export default Experience;
