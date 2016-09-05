import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";


export default class Sponsors extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("sponsors.getSponsors");
	}

	render() {

		let sponsors = SponsorCollection.find({}, {sort: {level: -1, name: 1}});
		let lowLevelSponsors = SponsorCollection.find({"level": "1"}, {sort: {name: 1}});
		let donors = SponsorCollection.find({"level": "0"}, {sort: {name: 1}});
		let images = Images.find({"category": "sponsor"});

		if (!sponsors || !images) {
			return <div></div>;
		}

		return (
			<div>
				<Card title="Sponsors and Donors" content={
					<div className="sponsors">
						<strong>Your name here!</strong> Please consider sponsoring the ARGS Robotics Team. Among the many thanks that you will receive, we will promote your business through this website, in our pit at competitions, and on our robot. Please contact us if you are interested in making a donation.
					</div>
				}/>

				<div className="sponsors-left col-sm-6">

					{sponsors.map((sponsor)=> {
						Meteor.call("image.retrieve", {
							"name": sponsor.image
						}, function(error, response) {
							$("#" + sponsor._id).attr("src", response);
						});

						if (sponsor.level <= 1) {
							return;
						}

						return (
							<Card key={sponsor._id} content={
								<div>
									<a href={sponsor.website}><img id={sponsor._id} alt={sponsor.name} className="sponsor img-responsive center-block" /></a>
								</div>
							}/>
						)
					})}
				</div>

				<div className="sponsors-right col-sm-6">
					<Card title="Other Sponsors" content={
						<div>
						{lowLevelSponsors.map((sponsor)=> {
							return (
								<div key={sponsor._id}>
									<h4>{sponsor.name}</h4>
								</div>
							)
						})}
						</div>
					} />

					<Card title="Donors" content={
						<div>
						{donors.map((donor)=> {
							return (
								<div key={donor._id}>
									<h4>{donor.name}</h4>
								</div>
							)
						})}
						</div>
					} />
				</div>
			</div>
		)
	}
}
