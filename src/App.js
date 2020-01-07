import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Signin from "./components/signin/Signin";
import Register from "./components/register/Register";

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

const initialState = {
	input: "",
	imageUrl: "",
	box: {},
	route: "signin",
	signedIn: false,
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: ""
	}
};
class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = data => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		});
	};

	calculateFaceLocation = data => {
		const faceLocation =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: faceLocation.left_col * width,
			topRow: faceLocation.top_row * height,
			rightCol: width - faceLocation.right_col * width,
			bottomRow: height - faceLocation.bottom_row * height
		};
	};

	displayFacialSquare = box => {
		this.setState({ box });
	};

	onInputChange = e => {
		this.setState({ input: e.target.value });
	};

	onImageSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => {
				if (response) {
					fetch("http://localhost:3000/image", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ id: this.state.user.id })
					})
						.then(response => response.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, { entries: count }));
						})
						.catch(console.log);
				}

				this.displayFacialSquare(this.calculateFaceLocation(response));
			})
			.catch(err => console.log(err));
	};

	onRouteChange = route => {
		if (route === "signout") {
			this.setState(initialState);
		} else if (route === "home") {
			this.setState({ signedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { route, signedIn, imageUrl, box } = this.state;
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navbar onRouteChange={this.onRouteChange} signedIn={signedIn} />
				{route === "home" ? (
					<div>
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onImageSubmit={this.onImageSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === "signin" ? (
					<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
				) : (
					<Register
						onRouteChange={this.onRouteChange}
						loadUser={this.loadUser}
					/>
				)}
			</div>
		);
	}
}

export default App;
