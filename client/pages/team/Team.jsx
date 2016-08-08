import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import AccountsUI from "../../components/AccountsUI.jsx";

export default class Team extends TrackerReact(React.Component) {

	render() {

		if (!Accounts.userId()) {
			FlowRouter.go("/team/login");
		}

		const name = Accounts.user() ? Accounts.user().profile.name : "";

		return (
			<div>
				<Card title={<div><AccountsUI /></div>} content={
					<div>
						<ul className="nav nav-tabs">
							<li role="presentation" className="active"><a href="/team">Home</a></li>
							<li role="presentation"><a href="/team/edit">Page Editor</a></li>
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
