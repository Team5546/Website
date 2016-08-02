import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class Alert extends TrackerReact(React.Component) {

	render() {

		const type = this.props.type;
		const message = this.props.message;

		var icon;

		switch(type) {
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
			<div className={`home-alert home-alert-${type} container`}>
				<div className="fit-width">
					<i className={`fa ${icon}`} aria-hidden="true"> </i> {message}
				</div>
			</div>
		)
	}
}