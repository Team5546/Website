import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import Banner from "../../components/Banner.jsx";

export default class Home extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("banners.getBanners");
	}

	render() {
		let banners = BannersCollection.find({}, {sort: {position: -1}});

		if (!banners) {
			return (
				<div className="loader">Loading...</div>
			)
		}

		return (
			<div>
				<div className="banner-container">
					{banners.map((banner)=> {
						return <Banner key={banner._id}
						               year={banner.year}
						               lineOne={banner.lineOne}
						               lineTwo={banner.lineTwo}
						               competition={banner.competition}/>
					})}
				</div>

				<Card title="Our Team" content={
					<div>
						<p>We are Team 5546, known as ART, the ARGS Robotics Team. Located in Petersburg, Virginia, we participate in the <em><a href="http://usfirst.org">FIRST</a></em> Robotics Competition. As a rookie team, we competed in the 2015 Virginia Regional FRC competition, and won the Rookie All-Star Award. This award allowed us to go to St. Louis, Missouri, where we participated in the FRC Championships. Being our first year as a team, we have learned so much from this experience, and going to championships gave us an amazing opportunity to learn from the teams that have been doing this for years.</p>
						<div className="row team-pics">
							<div className="col-xs-6 team-pics l-pic">
								<img src="/res/img/home2.jpg" className="img-responsive img-thumbnail team-pics" />
							</div>
							<div className="col-xs-6 team-pics r-pic">
								<img src="/res/img/home1.jpg" className="img-responsive img-thumbnail team-pics" />
							</div>
						</div>
					</div>
				}/>

				<Card title="What is FRC?" content={
					<div>
						<p>The <em>FIRST</em> Robotics Competition is an international robotics contest with over 32,000 teams participating. Each year the robots are challenged to a new game, and teams must design, build and program their robot accordingly over a six week period. The most intensive part of the year is from January to April, however there are many off season challenges and team meetings throughout the year. While this is a competition, <em>FIRST</em> stresses "Gracious professionalism" and a collaborative environment for all teams. There are many scholarship opportunities for team members, with $19 million awarded in 2014 alone. For more information, please see the <em>FIRST</em> website at <a href="http://usfirst.org">usfirst.org</a>.</p>
					</div>
				}/>

				<Card title="Sponsors" content={
				<div className="sponsors">
					<div>
						<p>We would love to thank our fabulous sponsors for our 2015 and 2016 years! There is no way we could have built such an awesome robot or gone to the championship without your support.</p>
					</div>
					<div className="row">
					<div className="col-xs-12">
						<img src="/res/img/sponsors/sponsors.png" className="img-responsive" />
						</div>
					</div>
				</div>
				}/>
			</div>
		)
	}
}
