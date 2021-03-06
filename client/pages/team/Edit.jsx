import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

export default class Edit extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("editor.getPages");
	}

	editPage() {
		FlowRouter.go("/team/preview/" + $(".input-page").val())
	}

	createPage(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("editor.createPage", {
			"name": $(".input-create-page").val(),
			"title": $(".input-create-title").val()
		}, function(err) {
			if (!err) {
				$(".input-create-page").val("");
				$(".input-create-title").val("");
				Bert.alert({
					message: "Page Created",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	render() {
		let pages = Pages.find();

		return (
			<div className="edit">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="editor"/>
						<div>

							<div>
								<h3>Modify a page</h3>
								<div className="form-group">
										<select className="form-control input-page" id="input-page">
											{pages.map((page)=> {
												return (
													<option key={page._id} value={page._id}>{page.title}</option>
												)
											})}
										</select>
								</div>
								<button className="btn btn-primary" onClick={this.editPage}>Edit</button>
							</div>

							<form onSubmit={this.createPage} style={{marginTop: "80px"}}>
								<h3>Create a new page</h3>
								<div className="form-group">
									<label>Name</label> — This is what shows up in the browser, and should not be changed afterwards. The name should be lowercase and have no spaces (use a hyphen instead) or special characters.<input className="form-control input-create-page" placeholder="Page name" />
									<br />
									<label>Title</label> — This is the user-friendly name that will show up in the window title and should use proper spaces and capitalization.<input className="form-control input-create-title" placeholder="Page title" />
								</div>
								<button className="btn btn-primary" onClick={this.createPage}>Create Page</button>
							</form>
						</div>
					</div>
				}/>

			</div>

		)
	}
}
