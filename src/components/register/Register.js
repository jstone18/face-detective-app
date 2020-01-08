import React, { Component } from "react";

class Register extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			email: "",
			password: ""
		};
	}

	onInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmitSignIn = event => {
		fetch("https://stormy-ocean-59759.herokuapp.com/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
			.then(res => res.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				}
			});
	};

	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f2 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">
									Name
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="text"
									name="name"
									id="name"
									onChange={this.onInputChange}
								/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email"
									id="email-address"
									onChange={this.onInputChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onInputChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Register"
								onClick={this.onSubmitSignIn}
							/>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Register;
