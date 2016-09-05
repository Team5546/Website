import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";
import DOMPurify from "dompurify";

export default class Team extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("settings.getTeamHomeContent");
	}

	getTeamHomeContent() {
		return Settings.findOne({"name": "team-home-content"});
	}

	render() {
		let teamHome = this.getTeamHomeContent();

		if (!teamHome) {
			return <div></div>;
		}
		
		return (
			<div>
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="home"/>
						
						<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(teamHome.content)}}></div>
					</div>
				}/>
			</div>
		)
	}
}
