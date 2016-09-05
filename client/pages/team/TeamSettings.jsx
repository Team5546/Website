import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class TeamSettings extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("settings.getTeamHomeContent");
	}

	componentDidUpdate() {
		this.editPage();
	}

	componentDidMount() {
		this.editPage();
	}

	editPage() {
		var _this = this;

		$('.editor').summernote({
			fontNames: ['Open Sans', 'Coo Hew'],
			fontNamesIgnoreCheck: ['Open Sans', 'Coo Hew']
		});

		$('.editor').each(function (i, obj) {
			$('.editor').summernote("code", Settings.findOne({"name": "team-home-content"}).content);
		});
	}

	saveChanges() {
		Meteor.call("settings.updateTeamHomeContent", {
			"content": $('.editor').summernote('code')
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
	
	getTeamHomeContent() {
		return Settings.findOne({"name": "team-home-content"});
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
				"category": $(".image-upload-category").val(),
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
					$(".image-upload-category").val("");
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

		if (!teamHome) {
			return <div></div>;
		}

		return (
			<div className="settings">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="settings"/>
						<div>
							<a href="/team/banners" className="btn btn-primary">Edit team banners</a>
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
									<input type="text" placeholder="Image name (no spaces)" className="image-upload-name form-control" />
								</div>
								<div className="form-group">
									<input type="text" placeholder="Category (optional)" className="image-upload-category form-control" />
								</div>
								<button onClick={this.upload} className="btn btn-primary">Upload</button>
							</form>

							<form onSubmit={this.deleteImage.bind(this)}>
								<h3>Delete an image by its name</h3>
								<div className="form-group">
									<input type="text" placeholder="Image name" className="image-delete-name form-control" />
								</div>
								<button onClick={this.deleteImage} className="btn btn-danger">Delete</button>
							</form>
						</div>

						<hr />

						<h3>Update team homepage</h3>
						<div className="editor"></div>
						<button className="btn btn-success" onClick={this.saveChanges}>Save Changes</button>
					</div>
				}/>
			</div>

		)
	}
}
