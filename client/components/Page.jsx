import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import DOMPurify from "dompurify";

Pages = new Mongo.Collection("pages");

export default class Page extends TrackerReact(React.Component) {

	getPage() {
		return Pages.find().fetch()[0]
	}

	render() {

		if (this.getPage()) {
			return (
				<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.getPage().content)}}>
				</div>
			)
		} else {
			return (
				<div>
					Loading...
				</div>
			)
		}
	}
}
