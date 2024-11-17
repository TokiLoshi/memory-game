import { Html, useProgress } from "@react-three/drei";

export function LoadingScreen() {
	const { progress } = useProgress();
	const progressValue = Math.round(progress);

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
							Loading {progressValue}%
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
									width: `${progressValue}%`,
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
								{progressValue}%
							</p>
						</div>
					</div>
				</div>
			</Html>
		</>
	);
}
