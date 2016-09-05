import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class TeamSponsors extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("sponsors.getSponsors");
	}
	
	addSponsor(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("sponsor.create", {
			"name": $(".new-sponsor-name").val(),
			"website": $(".new-sponsor-website").val(),
			"level": $(".new-sponsor-level").val(),
			"image": $(".new-sponsor-image").val()
		}, function(err) {
			if (!err) {
				$(".new-sponsor-name").val("").focus();
				$(".new-sponsor-website").val("");
				$(".new-sponsor-image").val("");
			}
		});
	}

	render() {

		let sponsors = SponsorCollection.find({}, {sort: {level: -1, name: 1}});

		if (!sponsors) {
			return (
				<div></div>
			)
		}

		return (
			<div className="team-sponsors">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="sponsor-editor"/>

						<h3>New Sponsor</h3>
						<form onSubmit={this.addSponsor.bind(this)}>
							<div className="form-group">
								<input className="form-control new-sponsor-name" placeholder="Name" type="text" />
							</div>
							<div className="form-group">
								<input className="form-control new-sponsor-website" placeholder="Website" type="text" />
							</div>
							<div className="form-group">
								<select className="form-control new-sponsor-level">
									<option value="1">1 - Lizard</option>
									<option value="2">2 - Basilisk</option>
									<option value="3">3 - Hydra</option>
									<option value="4">4 - Wyvern</option>
									<option value="5">5 - Dragon</option>
								</select>
							</div>
							<div className="form-group">
								<input className="form-control new-sponsor-image" placeholder="Image name" type="text" />
							</div>
							<button className="btn btn-primary new-sponsor-submit" onClick={this.addSponsor.bind(this)}>Submit</button>
						</form>

						<br />
						<ul className="list-group">
						{sponsors.map((sponsor)=> {
								return (
									<li className="list-group-item" key={sponsor._id}>
										{sponsor.level} — <a href={`/team/sponsors/edit/${sponsor._id}`}>{sponsor.name}</a>
									</li>
								)
						})}
						</ul>
					</div>
				}/>
			</div>

		)
	}
}
