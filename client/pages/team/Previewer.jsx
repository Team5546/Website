import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";
import DOMPurify from "dompurify";

export default class Editor extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);

		Meteor.subscribe("getPage", this.props.page);
	}

	componentDidMount() {

	}

	getPage(page) {
		return Pages.findOne({"name": page});
	}

	editPage() {
		FlowRouter.go("/team/edit/" + this.props.page);
	}
	
	addCard() {
		Meteor.call("editor.addCard", this.props.page);
	}

	deleteCard(id) {
		Meteor.call("editor.deleteCard", {"name": this.props.page, "id": id});
	}

	back() {
		FlowRouter.go("/team/edit");
	}

	render() {
		let page = this.getPage(this.props.page);

		if (!Accounts.userId()) {
			FlowRouter.go("/team/login");
		}

		if (!page) {
			return (
				<div></div>
			)
		}

		return (
			<div className="edit">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader />
						<div>
							<button className="btn btn-default btn-editor editor-save" onClick={this.back.bind(this)}>&larr; Back to Page Select</button>
							<button className="btn btn-primary btn-editor editor-edit" onClick={this.editPage.bind(this)}>Edit This Page</button>
							<button className="btn btn-default btn-editor editor-add" onClick={this.addCard.bind(this)}>Add Card</button>
						</div>
					</div>
				}/>

				{page.cards.map((card)=> {
					return (
						<div key={card.id}>
							<Card title={
								<div>
									{card.title}
									<span><span onClick={this.deleteCard.bind(this, card.id)}><i className="card-corner fa fa-trash"></i></span></span>
								</div>
							} reactKey={card.id} cornerIcon="fa-trash" className="editor" content={
								<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(card.content)}}></div>
							}/>
						</div>
					)
				})}

			</div>

		)
	}
}
