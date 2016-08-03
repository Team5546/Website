import React, {Component} from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../components/Card.jsx";
import DOMPurify from "dompurify";

Pages = new Mongo.Collection("pages");

export default class Page extends TrackerReact(Component) {

	constructor(props) {
		super(props);

		this.state = {
			subscription: {
				pages: Meteor.subscribe("getPage", this.props.name)
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.pages.stop();
	}

	getPage(page) {
		return Pages.findOne({"name": page});
	}

	render() {
		let page = this.getPage(this.props.name);

		if (page) {
			return (
				<div>
					{page.cards.map( (card)=>{
						return <Card key={card.title} title={card.title} content={
							<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(card.content)}}></div>
						}/>
					} )}

					<p id="test">Test</p>

				</div>
			)
		} else {
			return (
				<div>

				</div>
			)
		}
	}
}
