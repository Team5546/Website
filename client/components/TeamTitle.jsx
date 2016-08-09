import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class TeamTitle extends TrackerReact(React.Component) {

	logout() {
		Accounts.logout();
	}

	render() {

		var userName = Meteor.user() ? Meteor.user().profile.name : "";

		return (
			<div>
				{userName}
				<button className="btn btn-default signout" onClick={this.logout}>Log Out</button>
			</div>
		)
	}
}