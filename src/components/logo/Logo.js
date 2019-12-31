/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import brain from "./brain.png";

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt
				className="Tilt br-2 shadow-2"
				options={{ max: 55 }}
				style={{ height: 150, width: 150 }}>
				<div className="Tilt-inner pa3">
					<img style={{ paddingTop: "10px" }} src={brain} alt="brain-icon" />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
