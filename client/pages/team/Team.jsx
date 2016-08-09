import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class Team extends TrackerReact(React.Component) {

	render() {

		if (!Accounts.userId()) {
			FlowRouter.go("/team/login");
		}

		const name = Accounts.user() ? Accounts.user().profile.name : "";

		return (
			<div>
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="home"/>
					</div>
				}/>
			</div>
		)
	}
}
