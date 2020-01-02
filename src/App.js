import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";

const app = new Clarifai.App({
	apiKey: "468af070835d428b83af1f0e3f3671b6"
});

const particlesOptions = {
	particles: {
		number: {
			value: 125,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: "",
			imageUrl: ""
		};
	}

	onInputChange = e => {
		this.setState({ input: e.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
			function(response) {
				console.log(response.outputs[0].data.regions);
			},
			function(err) {
				// there was an error
			}
		);
	};

	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navbar />
				<Logo />
				<Rank />
				<ImageLinkForm
					onInputChange={this.onInputChange}
					onButtonSubmit={this.onButtonSubmit}
				/>
				<FaceRecognition imageUrl={this.state.imageUrl} />
			</div>
		);
	}
}

export default App;
