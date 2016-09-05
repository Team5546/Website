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

	setClass() {
		$('.layout').addClass(Pages.findOne({"name": this.props.name}).category);
	}

	editPage(id) {
		FlowRouter.go(`/team/preview/${id}`);
	}

	render() {
		let page = this.getPage(this.props.name);

		if (!page) {
			return (
				<div></div>
			)
		}

		document.title = page.title + titleSuffix;

		let editBar = null;

		if (Roles.userIsInRole(Accounts.userId(), ['admin', 'editor'])) {
			editBar = <div>
				<button className="btn btn-primary" onClick={this.editPage.bind(this, page._id)}>Edit This Page</button>
			</div>;
		}

		return (
			<div>
				{editBar}
				{page.cards.map( (card)=>{
					return <Card key={card.title} title={card.title} content={
						<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(card.content)}}></div>
					}/>
				} )}
				{this.setClass()}
			</div>
		)

	}
}
