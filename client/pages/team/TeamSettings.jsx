import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class TeamSettings extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("settings.getTeamHomeContent");
		Meteor.subscribe("settings.getHomepageContent");
	}

	componentDidUpdate() {
		this.editPage();
	}

	componentDidMount() {
		this.editPage();
	}

	editPage() {
		$('.editor').summernote({
			fontNames: ['Open Sans', 'Coo Hew'],
			fontNamesIgnoreCheck: ['Open Sans', 'Coo Hew']
		});

		$('.editor-team-homepage').each(function (i, obj) {
			$('.editor-team-homepage').summernote("code", Settings.findOne({"name": "team-home-content"}).content);
		});
		
		$('.editor-home-about').each(function (i, obj) {
			$('.editor-home-about').summernote("code", Settings.findOne({"name": "homepage-about-content"}).content);
		});

		$('.editor-home-first').each(function (i, obj) {
			$('.editor-home-first').summernote("code", Settings.findOne({"name": "homepage-first-content"}).content);
		});

		$('.editor-home-sponsors').each(function (i, obj) {
			$('.editor-home-sponsors').summernote("code", Settings.findOne({"name": "homepage-sponsors-content"}).content);
		});
	}

	teamSaveChanges() {
		Meteor.call("settings.updateTeamHomeContent", {
			"content": $('.editor-team-homepage').summernote('code')
		}, function (err) {
			if (err) {
				Bert.alert({
					message: "Error",
					type: "danger",
					style: "growl-top-right",
					icon: "fa-exclamation"
				});
			} else {
				Bert.alert({
					message: "Saved!",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	aboutSaveChanges() {
		Meteor.call("settings.updateHomepageAboutContent", {
			"content": $('.editor-home-about').summernote('code')
		}, function (err) {
			if (err) {
				Bert.alert({
					message: "Error",
					type: "danger",
					style: "growl-top-right",
					icon: "fa-exclamation"
				});
			} else {
				Bert.alert({
					message: "Saved!",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	firstSaveChanges() {
		Meteor.call("settings.updateHomepageFirstContent", {
			"content": $('.editor-home-first').summernote('code')
		}, function (err) {
			if (err) {
				Bert.alert({
					message: "Error",
					type: "danger",
					style: "growl-top-right",
					icon: "fa-exclamation"
				});
			} else {
				Bert.alert({
					message: "Saved!",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	sponsorSaveChanges() {
		Meteor.call("settings.updateHomepageSponsorContent", {
			"content": $('.editor-home-sponsors').summernote('code')
		}, function (err) {
			if (err) {
				Bert.alert({
					message: "Error",
					type: "danger",
					style: "growl-top-right",
					icon: "fa-exclamation"
				});
			} else {
				Bert.alert({
					message: "Saved!",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	setLeftImage(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("settings.setLeftImage", {
			"image": $(".set-left-image").val()
		}, function(err) {
			if (!err) {
				Bert.alert({
					message: "Image set",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	setRightImage(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("settings.setRightImage", {
			"image": $(".set-right-image").val()
		}, function(err) {
			if (!err) {
				Bert.alert({
					message: "Image set",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	setSponsorImage(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("settings.setSponsorImage", {
			"image": $(".set-sponsor-image").val()
		}, function(err) {
			if (!err) {
				Bert.alert({
					message: "Image set",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}
	
	getTeamHomeContent() {
		return Settings.findOne({"name": "team-home-content"});
	}

	getSettings() {
		return Settings.find({"category": "homepage"});
	}

	upload(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		var reader = new FileReader();
		reader.readAsDataURL($("#file-upload")[0].files[0]);
		reader.onloadend = function() {
			Meteor.call("image.upload", {
				"name": $(".image-upload-name").val(),
				"base64": reader.result
			}, function (err) {
				if (err) {
					Bert.alert({
						message: "Upload failed",
						type: "danger",
						style: "growl-top-right"
					});
				} else {
					Bert.alert({
						message: "Uploaded successfully",
						type: "success",
						style: "growl-top-right",
						icon: "fa-check"
					});

					$("#file-upload").val("");
					$(".image-upload-name").val("");
					$("#upload-file-info").html("");
				}
			});
		}
	}

	deleteImage(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("image.delete", {
			"name": $(".image-delete-name").val()
		}, function(err) {
			if (!err) {
				$(".image-delete-name").val("");
			}
		});
	}

	updateFileName() {
		$('#upload-file-info').html($("#file-upload")[0].files[0].name);
	}

	render() {
		let teamHome = this.getTeamHomeContent();
		let settings = this.getSettings();

		if (!teamHome || !settings) {
			return <div></div>;
		}

		return (
			<div className="settings">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="settings"/>
						<div>
							<a href="/team/banners" className="btn btn-primary">Edit team banners</a><br /><br />
							<a href="/team/robots" className="btn btn-primary">Edit past robots</a>
							<hr />
							<form onSubmit={this.upload.bind(this)}>
							<h3>Upload an image</h3>
								<div className="form-group">
									<label className="btn btn-default btn-file">
										Browse <input type="file" id="file-upload" accept="image/*" style={{display: "none"}} onChange={this.updateFileName.bind(this)} />
									</label>&nbsp;
									<span className='label label-primary' id="upload-file-info"></span>
								</div>
								<div className="form-group">
									Image name (no spaces or file extensions). Image will upload as this name + .png/.jpg/.svg
									<input type="text" placeholder="ex. robotics-logo" className="image-upload-name form-control" />
								</div>
								<button onClick={this.upload} className="btn btn-primary">Upload</button>
							</form>

							<form onSubmit={this.deleteImage.bind(this)}>
								<h3>Delete an image by its name</h3>
								<div className="form-group">
									<input type="text" placeholder="Ex. robotics-logo.jpg" className="image-delete-name form-control" />
								</div>
								<button onClick={this.deleteImage} className="btn btn-danger">Delete</button>
							</form>
						</div>

						<hr />

						<h3>Team homepage</h3>
						<div className="editor editor-team-homepage"></div>
						<button className="btn btn-success" onClick={this.teamSaveChanges}>Save Changes</button>

						<hr />

						<h3>Homepage "Our Team" section</h3>
						<div className="editor editor-home-about"></div>
						<button className="btn btn-success" onClick={this.aboutSaveChanges}>Save Changes</button>

						<br /><br />
						<form onSubmit={this.setLeftImage.bind(this)}>
							<h4>Set left image</h4>
							<div className="form-group">
								<input type="text" placeholder="Image name" className="set-left-image form-control" />
							</div>
							<button onClick={this.setLeftImage} className="btn btn-success">Set</button>
						</form>

						<br />
						<form onSubmit={this.setRightImage.bind(this)}>
							<h4>Set right image</h4>
							<div className="form-group">
								<input type="text" placeholder="Image name" className="set-right-image form-control" />
							</div>
							<button onClick={this.setRightImage} className="btn btn-success">Set</button>
						</form>

						<hr />

						<h3>Homepage "What is FRC?" section</h3>
						<div className="editor editor-home-first"></div>
						<button className="btn btn-success" onClick={this.firstSaveChanges}>Save Changes</button>

						<hr />

						<h3>Homepage "Sponsors" section</h3>
						<div className="editor editor-home-sponsors"></div>
						<button className="btn btn-success" onClick={this.sponsorSaveChanges}>Save Changes</button>

						<br /><br />
						<form onSubmit={this.setSponsorImage.bind(this)}>
							<h4>Set large sponsor image</h4>
							<div className="form-group">
								<input type="text" placeholder="Image name" className="set-sponsor-image form-control" />
							</div>
							<button onClick={this.setSponsorImage} className="btn btn-success">Set</button>
						</form>
					</div>
				}/>
			</div>

		)
	}
}
