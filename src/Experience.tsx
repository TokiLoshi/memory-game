import "./style.css";

function Experience() {
	return (
		<>
			<mesh>
				<boxGeometry args={[1, 1, 1]} />{" "}
				{/* This defines the cube dimensions */}
				<meshStandardMaterial color='orange' /> {/* Material and color */}
			</mesh>
		</>
	);
}

export default Experience;
