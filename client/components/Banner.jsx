import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class Banner extends TrackerReact(React.Component) {

	render() {
		const year = this.props.year;
		const lineOne = this.props.lineOne;
		const lineTwo = this.props.lineTwo;
		const competition = this.props.competition;

		return (
			<div className="banner">
				<img src="/res/img/banner.svg" />
				<div className="banner-text">
					<div>{year}</div>
					<div>{lineOne}</div>
					<div>{lineTwo}</div>
					<div>{competition}</div>
				</div>
			</div>
		)
	}
}