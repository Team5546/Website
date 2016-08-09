import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class TeamHeader extends TrackerReact(React.Component) {

	render() {
		const active = this.props.active;

		return (
			<ul className="nav nav-tabs">
				<li role="presentation"><a href="/team">Home</a></li>
				<li role="presentation" className="active"><a href="/team/edit">Page Editor</a></li>
				<li role="presentation"><a href="#">Inventory</a></li>
				<li role="presentation"><a href="#">Users</a></li>
				<li role="presentation"><a href="#">Settings</a></li>
			</ul>
		)
	}
}