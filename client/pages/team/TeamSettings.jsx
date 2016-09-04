import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";
import DOMPurify from "dompurify";

export default class TeamSettings extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="settings">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="settings"/>
						<div>
							<a href="/team/banners" className="btn btn-default">Edit team banners</a>
						</div>
					</div>
				}/>
			</div>

		)
	}
}
