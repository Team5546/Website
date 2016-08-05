import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";


export default class Team extends TrackerReact(React.Component) {

	render() {
		Accounts.onLogin(function () {
			FlowRouter.go("/team");
		});

		if (!Accounts.userId()) {
			FlowRouter.go("/team/login");
		}

		const name = Accounts.user() ? Accounts.user().profile.name : "";

		return (
			<div>
				<Card title={<div>{name}</div>} content={
					<div>
						<ul className="nav nav-tabs">
							<li role="presentation" className="active"><a href="#">Home</a></li>
							<li role="presentation"><a href="#">Page Editor</a></li>
							<li role="presentation"><a href="#">Inventory</a></li>
							<li role="presentation"><a href="#">Users</a></li>
							<li role="presentation"><a href="#">Settings</a></li>
						</ul>
					</div>
				}/>
			</div>
		)
	}
}
