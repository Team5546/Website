import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class Alerts extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("alerts.getAlerts");
	}

	setAlert(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("alerts.setAlert", {
			type: $(".alert-type").val(),
			message: $(".alert-message").val(),
			expire: $(".alert-days").val()
		}, function(err) {
			if (!err) {
				Bert.alert({
					message: "Alert set",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	clearAlert() {
		Meteor.call("alerts.clearAlert", function(err) {
			if (!err) {
				Bert.alert({
					message: "Alert cleared",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		})
	}
	
	render() {
		let alert = Settings.findOne({"name": "alert"});
		if (!alert) {
			return (<div></div>)
		}

		let currentAlert = <div></div>;

		if (new Date(alert.expire).getTime() < new Date().getTime()) {
			currentAlert = <h3>No alert set.</h3>;
		} else {
			currentAlert =
				<div>
					<h3>Current Alert</h3>
					<strong>Message:</strong> {alert.message}<br />
					<strong>Type:</strong> {alert.type}<br />
					<strong>Expires:</strong> {new Date(alert.expire).toLocaleString()}<br />
					<button className="btn btn-danger" type="button" onClick={this.clearAlert}>Clear Alert</button>
				</div>;
		}

		return (
			<div className="alerts">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="alerts"/>

						{currentAlert}

						<h3>Set Alert</h3>
						<form onSubmit={this.setAlert}>
							Alert type
							<div className="form-group">
								<select className="form-control alert-type">
									<option value="default">Default (White)</option>
									<option value="success">Success (Green)</option>
									<option value="danger">Danger (Red)</option>
									<option value="info">Info (Blue)</option>
								</select>
							</div>
							<div className="form-group">
								<label>Message</label>
								<input type="text" className="form-control alert-message"/>
							</div>
							<div className="form-group">
								<label>Days alert should stay active (0 means it will expire at midnight today)</label>
								<input type="number" min="0" max="30" className="form-control alert-days"/>
							</div>
							<div className="form-group">
								<button className="btn btn-primary" type="submit" onClick={this.setAlert}>Submit</button>
							</div>
						</form>
					</div>
				}/>

			</div>

		)
	}
}
