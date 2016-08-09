import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";
import DOMPurify from "dompurify";

export default class Editor extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);

		Meteor.subscribe("editor.getPage", this.props.page);
	}

	componentDidMount() {

	}

	getPage(id) {
		return Pages.findOne({"_id": id});
	}

	editPage() {
		FlowRouter.go("/team/edit/" + this.props.page);
	}
	
	addCard() {
		Meteor.call("editor.addCard", this.props.page);
	}

	deleteCard(cardId) {
		Meteor.call("editor.deleteCard", {
			"id": this.props.page,
			"cardId": cardId
		});
	}

	updateTitle(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("editor.updateTitle", {
			"id": this.props.page,
			"title": $(".input-update-title").val()
		}, function(err) {
			if (!err) {
				$(".input-update-title").val("");
			}
		});
	}

	changeName(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("editor.changeName", {
			"id": this.props.page,
			"name": $(".input-change-name").val()
		}, function(err) {
			if (!err) {
				$(".input-change-name").val("");
			}
		});
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
							<h3>{page.title} ({page.name})</h3>
							<button className="btn btn-default btn-editor editor-save" onClick={this.back.bind(this)}>&larr; Back to Page Select</button>
							<button className="btn btn-primary btn-editor editor-edit" onClick={this.editPage.bind(this)}>Edit This Page</button>
							<button className="btn btn-default btn-editor editor-add" onClick={this.addCard.bind(this)}>Add Card</button>
							<a className="btn btn-default" role="button" data-toggle="collapse" href="#edit-collapse" aria-expanded="false" aria-controls="collapseExample">Options</a>
							<div className="row collapse" id="edit-collapse">
								<hr />
								<form className="col-md-6" onSubmit={this.updateTitle.bind(this)}>
									<div className="form-group">
									<h3>Update Title</h3>
									This is the user-friendly name that will show up in the window title and should use proper spaces and capitalization.<input type="text" className="form-control input-update-title" placeholder="Page title" />
									</div>
									<button className="btn btn-default" onClick={this.updateTitle.bind(this)}>Update Title</button>
								</form>
								<form className="col-md-6" onSubmit={this.changeName.bind(this)}>
									<div className="form-group">
									<h3>Change Name</h3>
									This is what shows up in the browser, and should not be changed afterwards. The name should be lowercase and have no spaces (use a hyphen instead) or special characters.<input type="text" className="form-control input-change-name" placeholder="Page name" />
									</div>
									<div style={{marginBottom: "10px"}}>This should only be done if absolutely necessary, as it will destroy any links to this page.</div>
									<button className="btn btn-warning" onClick={this.changeName.bind(this)}>Update Name</button>
								</form>
							</div>
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
