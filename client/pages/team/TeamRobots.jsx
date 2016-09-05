import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class TeamRobots extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("robot.getRobots");
	}
	
	createRobot() {
		Meteor.call("robot.create", {
			"year": $(".robot-year").val()
		});
	}

	render() {

		let robots = RobotsCollection.find({});

		if (!robots) {
			return <div></div>;
		}

		return (
			<div className="team-robots">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader />
						<div>
						<h2>Robot Editor</h2>
						<h3>Create new robot</h3>
						<div className="form-group">
							<input type="text" className="form-control robot-year" placeholder="Year" />
						</div>
						<button className="btn btn-primary btn-new-robot" onClick={this.createRobot}>New Robot</button>
							<h3>Choose a year to edit</h3>
							{robots.map((robot)=> {
								return (
									<div key={robot._id}>
										<h4><a href={`/team/robots/edit/${robot._id}`}>{robot.year}</a></h4>
									</div>)
							})}
						</div>
					</div>
				}/>
			</div>

		)
	}
}
