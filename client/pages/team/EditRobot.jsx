import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class EditRobot extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("robot.getRobots");
	}

	componentDidUpdate() {
		this.placeholders();
	}

	componentDidMount() {
		this.placeholders();
	}

	delete() {
		if (confirm("Are you sure you want to delete this robot?")) {
			Meteor.call("robot.delete", {
				"id": this.props.id
			}, function(err) {
				if (!err) {
					FlowRouter.go("/team/robots");
				}
			});
		}
	}


	placeholders() {
		let robot = RobotsCollection.findOne({"_id": this.props.id});

		if (robot) {
			$(".robot-year").val(robot.year);
			$(".robot-name").val(robot.name);
			$(".robot-image-left").val(robot.leftImage);
			$(".robot-image-right").val(robot.rightImage);
			$(".robot-image-center").val(robot.centerImage);
		}

		$('.editor').summernote({
			fontNames: ['Open Sans', 'Coo Hew'],
			fontNamesIgnoreCheck: ['Open Sans', 'Coo Hew']
		});

		$('.editor').each(function (i, obj) {
			$('.editor').summernote("code", robot.description);
		});
	}

	update(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("robot.update", {
			"id": this.props.id,
			"year": $(".robot-year").val(),
			"name": $(".robot-name").val(),
			"description": $('.editor').summernote('code'),
			"leftImage": $(".robot-image-left").val(),
			"rightImage": $(".robot-image-right").val(),
			"centerImage": $(".robot-image-center").val()
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
		FlowRouter.go("/team/robots");
	}

	render() {

		let robot = RobotsCollection.findOne({"_id": this.props.id});
		if (!robot) {
			return (
				<div></div>
			)
		}

		return (
			<div className="robot-editor">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader />
						<button className="btn btn-default" onClick={this.back.bind(this)}>&larr; Back to Robots</button>
						<h3>Edit {robot.year} Robot</h3>
						<form onSubmit={this.update.bind(this)}>
							<div className="form-group">
								Year
								<input className="form-control robot-year" type="text" />
							</div>
							<div className="form-group">
								Robot Name
								<input className="form-control robot-name" type="text" />
							</div>
							Description
							<div className="editor"></div>
							<div className="form-group">
								Left image link (from image upload in Settings tab)
								<input className="form-control robot-image-left" placeholder="Image name" type="text" />
							</div>
							<div className="form-group">
								Right image link (from image upload in Settings tab)
								<input className="form-control robot-image-right" placeholder="Image name" type="text" />
							</div>
							<div className="form-group">
								Center image link (from image upload in Settings tab)
								<input className="form-control robot-image-center" placeholder="Image name" type="text" />
							</div>
							<button className="btn btn-primary robot-submit" onClick={this.update.bind(this)}>Save</button>
						</form>

						<hr />

						<button className="btn btn-danger" onClick={this.delete.bind(this)}>Delete Robot</button>

						{this.placeholders}
					</div>
				}/>
			</div>

		)
	}
}
