import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";
import DOMPurify from "dompurify";

export default class TeamSettings extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
	}

	getBase64() {
		var reader = new FileReader();
		reader.readAsDataURL($("#file-upload")[0].files[0]);
		return reader.result;
	}

	upload() {
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

		return (
			<div className="settings">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="settings"/>
						<div>
							<a href="/team/banners" className="btn btn-primary">Edit team banners</a>
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
							<button onClick={this.upload} className="btn btn-primary">Upload</button>

							<form onSubmit={this.deleteImage.bind(this)}>
								<h3>Delete an image by its name</h3>
								<div className="form-group">
									<input type="text" placeholder="Image name" className="image-delete-name form-control" />
								</div>
								<button onClick={this.deleteImage} className="btn btn-danger">Delete</button>
							</form>
						</div>
					</div>
				}/>
			</div>

		)
	}
}
