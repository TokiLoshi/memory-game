import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export function LoadingScreen() {
	const { progress } = useProgress();
	const [displayProgress, setDisplayProgress] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDisplayProgress(Math.round(progress));
		}, 100);
		return () => clearTimeout(timer);
	}, [progress]);

	return (
		<>
			<Html center>
				<div
					style={{
						position: "fixed",
						inset: 0,
						display: "flex",
						alignItems: "center",
						backgroundColor: "rgba(0, 0, 0, 0.9)",
						transition: "opacity 300ms ease",
					}}>
					<div
						style={{
							textAlign: "center",
							fontFamily: "Doto, sans-serif",
						}}>
						<h2
							style={{
								fontSize: "2.5rem",
								color: "white",
								marginBottom: "1rem",
							}}>
							Loading {displayProgress}%
						</h2>
						<div
							style={{
								width: "256ppx",
								height: "8px",
								backgroundColor: "#333",
								borderRadius: "4px",
								overflow: "hidden",
							}}>
							<div
								style={{
									width: `${displayProgress}%`,
									height: "100%",
									backgroundColor: "#8DBBB7",
									borderRadius: "4px",
									transition: "width 300ms ease-out",
								}}
							/>
							<p
								style={{
									color: "white",
									marginTop: "0.5rem",
								}}>
								{displayProgress}%
							</p>
						</div>
					</div>
				</div>
			</Html>
		</>
	);
}
