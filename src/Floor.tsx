export default function Floor() {
	return (
		<>
			// Floor
			<mesh rotation-x={-Math.PI * 0.5} position-y={-0.001} receiveShadow>
				<planeGeometry args={[50, 50]} />
				<shadowMaterial transparent opacity={0.4} />
			</mesh>
		</>
	);
}
