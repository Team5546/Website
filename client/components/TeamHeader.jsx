import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class TeamHeader extends TrackerReact(React.Component) {

	render() {
		const active = this.props.active;
		
		let home = active == "home" ? "active" : "";
		let editor = active == "editor" ? "active" : "";
		let alerts = active == "alerts" ? "active" : "";
		let users = active == "users" ? "active" : "";
		let sponsors = active == "sponsors" ? "active" : "";
		let settings = active == "settings" ? "active" : "";

		if (Roles.getRolesForUser(Meteor.userId()).indexOf("admin") != -1) {
			return (
				<ul className="nav nav-tabs">
					<li role="presentation" className={home}><a href="/team">Home</a></li>
					<li role="presentation" className={editor}><a href="/team/edit">Page Editor</a></li>
					<li role="presentation" className={alerts}><a href="/team/alerts">Alerts</a></li>
					<li role="presentation" className={users}><a href="/team/users">Users</a></li>
					<li role="presentation" className={sponsors}><a href="/team/sponsors">Sponsors</a></li>
					<li role="presentation" className={settings}><a href="/team/settings">Settings</a></li>
				</ul>
			)
		}

		if (Roles.getRolesForUser(Meteor.userId()).indexOf("editor") != -1) {
			return (
				<ul className="nav nav-tabs">
					<li role="presentation" className={home}><a href="/team">Home</a></li>
					<li role="presentation" className={editor}><a href="/team/edit">Page Editor</a></li>
					<li role="presentation" className="disabled"><a href="#">Settings</a></li>
				</ul>
			)
		}

		return (
			<ul className="nav nav-tabs">
				<li role="presentation" className={home}><a href="/team">Home</a></li>
				<li role="presentation" className="disabled"><a href="#">Settings</a></li>
			</ul>
		)
	}
}