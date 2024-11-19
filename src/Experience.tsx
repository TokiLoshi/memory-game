import Game from "./Game";
import { Suspense } from "react";
import { LoadingScreen } from "./Loading";
import { OrbitControls } from "@react-three/drei";
import GameEnvironment from "./GameEnvironment";
import { Perf } from "r3f-perf";

export default function Experience() {
	return (
		<>
			<Perf position='top-left' />
			<OrbitControls
				makeDefault={true}
				minDistance={4}
				maxDistance={20}
				minPolarAngle={Math.PI / 4}
				maxPolarAngle={Math.PI / 2}
				target={[0.1, 4.5, 3.1]}
				enableDamping={true}
				dampingFactor={0.05}
			/>
			<Suspense fallback={<LoadingScreen />}>
				<Game />
			</Suspense>
			<GameEnvironment />
		</>
	);
}
