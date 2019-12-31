import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Logo />
			<ImageLinkForm />
		</div>
	);
}

export default App;
