import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class SponsorEditor extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("sponsors.getSponsors");
	}

	componentDidUpdate() {
		this.placeholders();
	}

	componentDidMount() {
		this.placeholders();
	}

	delete() {
		if (confirm("Are you sure you want to delete this sponsor?")) {
			Meteor.call("sponsor.delete", {
				"id": this.props.id
			}, function(err) {
				if (!err) {
					FlowRouter.go("/team/sponsors");
				}
			});
		}
	}


	placeholders() {
		let sponsor = SponsorCollection.findOne({"_id": this.props.id});

		if (sponsor) {
			$(".sponsor-name").val(sponsor.name);
			$(".sponsor-website").val(sponsor.website);
			$(".sponsor-level").val(sponsor.level);
			$(".sponsor-image").val(sponsor.image);
		}
	}

	update(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("sponsor.update", {
			"id": this.props.id,
			"name": $(".sponsor-name").val(),
			"website": $(".sponsor-website").val(),
			"level": $(".sponsor-level").val(),
			"image": $(".sponsor-image").val()
		}, function(err) {
			if (!err) {
				Bert.alert({
					message: "Saved!",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	back() {
		FlowRouter.go("/team/sponsors");
	}

	render() {

		let sponsor = SponsorCollection.findOne({"_id": this.props.id});
		if (!sponsor) {
			return (
				<div></div>
			)
		}

		return (
			<div className="sponsor-editor">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="sponsor-editor"/>
						<button className="btn btn-default btn-editor editor-save" onClick={this.back.bind(this)}>&larr; Back to Sponsors</button>
						<h2>{sponsor.name}</h2>
						<h3>Edit Sponsor</h3>
						<form onSubmit={this.update.bind(this)}>
							<div className="form-group">
								<input className="form-control sponsor-name" placeholder="Name" type="text" />
							</div>
							<div className="form-group">
								<input className="form-control sponsor-website" placeholder="Website" type="text" />
							</div>
							<div className="form-group">
								<select className="form-control sponsor-level">
									<option value="1">1 - Lizard</option>
									<option value="2">2 - Basilisk</option>
									<option value="3">3 - Hydra</option>
									<option value="4">4 - Wyvern</option>
									<option value="5">5 - Dragon</option>
								</select>
							</div>
							<div className="form-group">
								<input className="form-control sponsor-image" placeholder="Image name" type="text" />
							</div>
							<button className="btn btn-primary sponsor-submit" onClick={this.update.bind(this)}>Save</button>
						</form>

						<hr />

						<button className="btn btn-danger" onClick={this.delete.bind(this)}>Delete Sponsor</button>

						{this.placeholders}
					</div>
				}/>
			</div>

		)
	}
}
