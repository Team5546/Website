import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class TeamHeader extends TrackerReact(React.Component) {

	render() {
		const active = this.props.active;
		
		let home = active == "home" ? "active" : "";
		let editor = active == "editor" ? "active" : "";
		let users = active == "users" ? "active" : "";

		return (
			<ul className="nav nav-tabs">
				<li role="presentation" className={home}><a href="/team">Home</a></li>
				<li role="presentation" className={editor}><a href="/team/edit">Page Editor</a></li>
				<li role="presentation"><a href="#">Alerts</a></li>
				<li role="presentation" className={users}><a href="/team/users">Users</a></li>
				<li role="presentation"><a href="#">Settings</a></li>
			</ul>
		)
	}
}