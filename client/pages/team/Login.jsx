import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import AccountsUI from "../../components/AccountsUI.jsx"

export default class Login extends TrackerReact(React.Component) {

	render() {
		return (
			<div>
				<Card title="Please login to view this content" content={
					<AccountsUI />
				}/>
			</div>
		)
	}
}
