import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import AccountsUI from "../../components/AccountsUI.jsx";
import DOMPurify from "dompurify";

export default class Edit extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.call("editor.getPage", {page: "Test"}, function(err, response) {
			Session.set('page', response);
		});

	}

	getId() {
		return Math.floor(Math.random() * 99999999) + 10000000;
	}

	getPage(page) {
		return Pages.findOne({"name": page});
	}

	saveChanges() {
		Meteor.call("editor.updatePage", {
			"page": "Test",
			"content": $('.editor').summernote('code')
		}, function (err, response) {
			if (response) {
				Bert.alert({
					message: "Saved!",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	getPageContent() {
		return Session.get('page');
	}

	editPage() {
		$('.editor').summernote({
			fontNames: ['Open Sans', 'Coo Hew'],
			fontNamesIgnoreCheck: ['Open Sans', 'Coo Hew']
		});

		$('.editor').each(function (i, obj) {
			$('.editor').eq(i).summernote('code', Session.get("page").cards[i].content);
		});
	}

	render() {
		let page = this.getPageContent();

		if (!Accounts.userId()) {
			FlowRouter.go("/team/login");
		}

		const name = Accounts.user() ? Accounts.user().profile.name : "";

		if (!page) {
			return (
				<div></div>
			)
		}

		return (
			<div className="edit">
				<Card title={<div><AccountsUI /></div>} content={
					<div>
						<ul className="nav nav-tabs">
							<li role="presentation"><a href="/team">Home</a></li>
							<li role="presentation" className="active"><a href="/team/edit">Page Editor</a></li>
							<li role="presentation"><a href="#">Inventory</a></li>
							<li role="presentation"><a href="#">Users</a></li>
							<li role="presentation"><a href="#">Settings</a></li>
						</ul>
						<p>
							Choose a page to edit:
							<select>
								<option>Sponsors</option>
							</select>
							<br />
							<button className="save-changes btn btn-primary" onClick={this.editPage}>Edit Page</button><br />
							<button className="save-changes btn btn-success" onClick={this.saveChanges}>Save Changes</button>
							<button className="save-changes btn btn-default" onClick={this.addCard}>Add Card</button>
						</p>
					</div>
				}/>

				{page.cards.map( (card)=>{
					return <Card key={this.getId()} title={card.title} className="editor" content={
							<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(card.content)}}></div>
						}/>
				} )}

			</div>

		)
	}
}
