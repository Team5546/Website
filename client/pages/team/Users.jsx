import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class Users extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		//Meteor.subscribe("editor.getPages");
	}

	render() {
		//let pages = Pages.find();

		return (
			<div className="edit">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="users"/>
						<div>
							
						</div>
					</div>
				}/>

			</div>

		)
	}
}
