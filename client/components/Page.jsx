import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../components/Card.jsx";
import DOMPurify from "dompurify";

export default class Page extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);

		Meteor.subscribe("editor.getPageByName", this.props.name);
	}

	getPage(name) {
		return Pages.findOne({"name": name});
	}

	render() {
		let page = this.getPage(this.props.name);

		if (!page) {
			return (
				<div></div>
			)
		}

		document.title = page.title + titleSuffix;

		return (
			<div>
				{page.cards.map( (card)=>{
					return <Card key={card.title} title={card.title} content={
						<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(card.content)}}></div>
					}/>
				} )}
			</div>
		)

	}
}
