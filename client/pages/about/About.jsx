import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";


export default class About extends TrackerReact(React.Component) {

	render() {
		return (
			<div>
				<Card title="About Our Team" content={
				<div>
					<p>We are Team 5546, known as ART, the ARGS Robotics Team. Located in Petersburg, Virginia, we participate in the <span className="first"><a href="http://usfirst.org">FIRST</a></span> Robotics Competition. We are a small team consisting of around 15-17 people, and are part of the <a href="https://args.us">Appomattox Regional Governor's School for the Arts and Technology</a>.</p>
					<p>As a rookie team, we competed in the 2015 Virginia Regional FRC competition, and won the Rookie All-Star Award. This award allowed us to go to St. Louis, Missouri, where we participated in the FRC Championships. Being our first year as a team, we learned so much from this experience, and going to championships gave us an amazing opportunity to learn from the teams that have been doing this for years.</p>
					<p>This year, our team participated in the Hampton Roads District Event, Central Virginia District Event, Chesapeake District Championship, and made it to the Hopper Division at the World Championship. </p>
				</div>
				}/>

				<Card title="Outreach" content={
				<div>
					<p>During build season for the 2016 year, we helped Team T.I.G.E.R.S (6021) create their first robot, including manufacturing, programming, and strategy, so that they could compete in their very first FIRST event as a team. They learned so much during their adventures with us each week, and we look forward to see what they do next year!</p>
					<p>We have demonstrated our robots from both 2015 and 2016 at various libraries throughout Virginia, and have hosted workshops for younger students to learn STEM concepts.</p>
				</div>
				}/>
			</div>
		)
	}
}
