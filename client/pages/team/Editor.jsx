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

	componentDidUpdate() {
		this.editPage();
	}

	componentDidMount() {
		this.editPage();
	}

	getPage(id) {
		return Pages.findOne({"_id": id});
	}

	saveChanges(exit) {
		var length = $('.editor').length;
		var contents = [];
		var titles = [];
		var cards = [];
		var _this = this;

		$('.editor').each(function (i, obj) {
			contents.push($('.editor').eq(i).summernote('code'));
		});

		$('.editor-title').each(function (i, obj) {
			titles.push($('.editor-title').eq(i).val());
		});

		for (i = 0; i < length; i++) {
			cards.push({
				"id": _this.getPage(_this.props.page).cards[i].id,
				"title": titles[i],
				"content": contents[i]
			});
		}

		Meteor.call("editor.updatePage", {
			"id": this.props.page,
			"cards": cards
		}, function (err, response) {
			if (response) {
				Bert.alert({
					message: "Saved!",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});

				if (exit) {
					_this.back();
				}

			} else {
				Bert.alert({
					message: "Error!",
					type: "danger",
					style: "growl-top-right",
					icon: "fa-exclamation"
				});
			}
		});


	}

	editPage() {
		var _this = this;

		$('.editor').summernote({
			fontNames: ['Open Sans', 'Coo Hew'],
			fontNamesIgnoreCheck: ['Open Sans', 'Coo Hew']
		});

		$('.editor').each(function (i, obj) {
			$('.editor').eq(i).summernote("code", _this.getPage(_this.props.page).cards[i].content);
		});

		$('.editor-title').each(function (i, obj) {
			$('.editor-title').eq(i).val(_this.getPage(_this.props.page).cards[i].title);
		});
	}

	back() {
		FlowRouter.go("/team/preview/" + this.props.page);
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
						<TeamHeader active="editor"/>
						<h3>{page.title} ({page.name})</h3>
						<p className="editor-buttons">
							<button className="btn btn-danger editor-back" onClick={this.back.bind(this)}>&larr; Back to Preview</button>
							<button className="btn btn-success editor-save" onClick={this.saveChanges.bind(this, false)}>Save Changes</button>
							<button className="btn btn-default editor-save-exit" onClick={this.saveChanges.bind(this, true)}>Save & Exit</button>
						</p>
					</div>
				}/>

				{page.cards.map((card)=> {
					return (
						<div key={card.id}>
							<input className="editor-title" />
							<Card title={card.title} className="editor" content={
								<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(card.content)}}></div>
							}/>
						</div>
					)
				})}
			</div>

		)
	}
}
