import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";


export default class Card extends TrackerReact(React.Component) {

	render() {
		const title = this.props.title;
		const content = this.props.content;

		var header;

		if (title) {
			header = <div className="card-header">
				<span className="card-title">{title}</span>
			</div>;
		} else {
			header = '';
		}

		return (
			<div className="card">
				{header}
				<div className="card-content">
					{content}
				</div>
			</div>
		)
	}
}