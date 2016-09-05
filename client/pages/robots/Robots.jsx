import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import DOMPurify from "dompurify";

export default class Robots extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("robot.getRobots");
	}

	render() {

		let robots = RobotsCollection.find({});
		if (!robots) {
			return (
				<div></div>
			)
		}

		return (
			<div>
				<Card title="Our Robots" content={
				<div>
					Past robots from our 2015 and 2016 years.
				</div>}/>

				{robots.map((robot)=> {

					Meteor.call("image.retrieve", {
						"name": robot.leftImage
					}, function(error, response) {
						$(`#${robot._id}-left`).attr("src", response);
					});
					Meteor.call("image.retrieve", {
						"name": robot.rightImage
					}, function(error, response) {
						$(`#${robot._id}-right`).attr("src", response);
					});
					Meteor.call("image.retrieve", {
						"name": robot.centerImage
					}, function(error, response) {
						$(`#${robot._id}-center`).attr("src", response);
					});

					return (
						<div key={robot._id}>
							<Card title={`${robot.year} - "${robot.name}"`} content={
							<div>
								<p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(robot.description)}}></p>
								<div className="row robot-pics">
									<div className="col-xs-6 robot-pics l-pic">
										<img id={`${robot._id}-left`} className="img-responsive robot-pics shadow" />
									</div>
									<div className="col-xs-6 robot-pics r-pic">
										<img id={`${robot._id}-right`} className="img-responsive robot-pics shadow" />
									</div>
								</div>
								<div className="row robot-pics">
									<div className="col-xs-12 robot-pics" style={{paddingTop: 0, paddingBottom: 0}}>
										<img id={`${robot._id}-center`} className="img-responsive robot-pics shadow" />
									</div>
								</div>
							</div>
							} />
						</div>)
				})}
			</div>
		)
	}
}
