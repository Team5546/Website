import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class Footer extends TrackerReact(React.Component) {

	render() {

		return (
			<div className="footer">
				<div className="footer-content">
					<h2>ARGS Robotics Team</h2>
					<p>512 W. Washington St., Petersburg, VA. 23803<br />
						ARGS Robotics Team is a 501(c)(3) non-profit organization.</p>
					<p><em>FIRST<sup>&reg;</sup></em> is a registered trademark of United States Foundation for Inspiration and Recognition of Science and Technology.</p>
				</div>
			</div>
		)
	}
}