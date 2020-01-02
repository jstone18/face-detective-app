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
			imageUrl: "",
			box: {}
		};
	}

	calculateFaceLocation = data => {
		const faceLocation =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: faceLocation.left_col * width,
			topRow: faceLocation.top_row * height,
			rightCol: width - (faceLocation.right_col * width),
			bottomRow: height - (faceLocation.bottom_row * height),
		};
	};

	displayFacialSquare = box => {
		console.log(box);
		
		this.setState({box})
	} 

	onInputChange = e => {
		this.setState({ input: e.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => this.displayFacialSquare(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
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
				<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
			</div>
		);
	}
}

export default App;
