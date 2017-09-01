import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";

export default class Login extends TrackerReact(React.Component) {

	loginWithGoogle() {
		Meteor.loginWithGoogle({}, function(error) {
			if (error) {
        FlowRouter.go("/team/loginfailed");
      }
		});
	}

	render() {
		Accounts.onLogin(function () {
			FlowRouter.go("/team");
		});

		return (
			<div>
				<Card title="Login to view this content" content={
					<div>
						<div style={{marginBottom: "30px"}}>
							Accessing this page requires an approved account. Students must use an args.us or argsrobotics.com email address. Parents and mentors may use their personal emails, but will need to have them input.
						</div>
						<a className="btn btn-google-login" onClick={this.loginWithGoogle}><i className="fa fa-google"></i>Sign in with Google</a>
					</div>
				}/>
			</div>
		)
	}
}
