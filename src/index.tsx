import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
// import { StrictMode } from "react";
import { Leva } from "leva";
// import Game from "./Game";
import Experience from "./Experience";
import { Loader, PerspectiveCamera } from "@react-three/drei";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
	<>
		<Leva hidden={location.hash !== "#debug"} />

		<Canvas
			shadows
			gl={{
				powerPreference: "default",
				// antialias: false, //
			}}>
			<PerspectiveCamera
				fov={75}
				near={0.1}
				far={300}
				position={[0.1, 4.5, 3.1]}
			/>

			<Experience />
		</Canvas>
		<Loader
			containerStyles={{ backgroundColor: "rgba(0, 0.8, 0, 0.8)" }}
			innerStyles={{ color: "whitesmoke", fontSize: "1.5rem" }}
			barStyles={{
				backgroundColor: "#7fd5a7",
				height: "10px",
				borderRadius: "5px",
			}}
		/>
	</>
);
