import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";


export default class Robots extends TrackerReact(React.Component) {

	render() {
		return (
			<div>
				<Card title="Our Robots" content={
				<div>
					Past robots from our 2015 and 2016 years.
				</div>}/>

				<Card title="2016 - &quot;Starry Knight&quot;" content={
				<div>
					<p>This year's robot uses 10 inch tiller tires, and we dominated the defenses and easily. Of course, it is not complete without our signature scale at the end and "Hi Mom".</p>
					<div className="row robot-pics">
						<div className="col-xs-6 robot-pics l-pic">
							<img src="/res/img/2016hi-mom.jpg" className="img-responsive robot-pics shadow" />
						</div>
						<div className="col-xs-6 robot-pics r-pic">
							<img src="/res/img/2016win.JPG" className="img-responsive robot-pics shadow" />
						</div>
					</div>
					<div className="row robot-pics">
						<div className="col-xs-12 robot-pics" style={{paddingTop: 0, paddingBottom: 0}}>
							<img src="/res/img/2016in-action.JPG" className="img-responsive robot-pics shadow" />
						</div>
					</div>
				</div>}/>

				<Card title="2015 - &quot;404 Not Found&quot;" content={
				<div>
					<p>Our robot this year is dedicated to our past FRC team - Team 404. They had made many accomplishments, but sadly disbanded. Several years later, we decided to bring back the robotics team. With completely new members, resources, and mentors, FRC Team 404 is back as Team 5546.</p>
					<div className="row robot-pics">
						<div className="col-xs-6 robot-pics l-pic">
							<img src="/res/img/robot2015-8-stack.jpg" className="img-responsive robot-pics shadow" />
						</div>
						<div className="col-xs-6 robot-pics r-pic">
							<img src="/res/img/robot2015-2.jpg" className="img-responsive robot-pics shadow" />
						</div>
					</div>
					<div className="row robot-pics">
						<div className="col-xs-12 robot-pics" style={{paddingTop: 0, paddingBottom: 0}}>
							<img src="/res/img/robot2015-sparks.jpg" className="img-responsive robot-pics shadow" />
						</div>
					</div>
				</div>}/>
			</div>
		)
	}
}
