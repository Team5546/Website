import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import DOMPurify from "dompurify";

export default class Alert extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("alerts.getAlerts");
	}

	render() {

		let alert = Settings.findOne({"name": "alert"});

		if (!alert) {
			return <div></div>;
		}

		if (new Date(alert.expire).getTime() < new Date().getTime()) {
			return <div></div>;
		}

		var icon;

		switch(alert.type) {
			case 'info':
				icon = 'fa-info-circle';
				break;
			case 'danger':
				icon = 'fa-exclamation-circle';
				break;
			case 'success':
				icon = 'fa-check-circle';
				break;
			case 'default':
				icon = '';
				break;
			default:
				icon = '';
		}

		return (
			<div className={`home-alert home-alert-${alert.type} container`}>
				<div className="fit-width">
					<i className={`fa ${icon}`} aria-hidden="true"> </i> <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(alert.message)}}></span>
				</div>
			</div>
		)
	}
}