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

	deletePage() {
		if (confirm('Are you sure you want to delete the page "' + $(".input-page option:selected").text() + '"')) {
			Meteor.call("editor.deletePage", $(".input-page").val(), function(err) {
				if (!err) {
					Bert.alert({
						message: "Page Deleted",
						type: "success",
						style: "growl-top-right",
						icon: "fa-trash"
					});
				}
			});
		}
	}

	createPage(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("editor.createPage", $(".input-create-page").val(), function(err) {
			if (!err) {
				$(".input-create-page").val("");
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

		// If the server has not sent the collection over yet, don't try to render or access the database
		if (!Pages) {
			return;
		}

		// Redirect to login page if user is not authenticated
		if (!Accounts.userId()) {
			FlowRouter.go("/team/login");
		}

		let pages = Pages.find();

		return (
			<div className="edit">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader />
						<div>

							<div>
								<label>Modify a page</label>
								<div className="form-group">
										<select className="form-control input-page" id="input-page">
											{pages.map((page)=> {
												return (
													<option key={page._id} value={page._id}>{page.name}</option>
												)
											})}
										</select>
								</div>
								<button className="btn btn-primary col-xs-9" onClick={this.editPage}>Edit</button>
								<button className="btn btn-danger col-xs-3" onClick={this.deletePage}>Delete</button>
							</div>

							<form onSubmit={this.createPage} style={{marginTop: "80px"}}>
								<label>Create a new page</label>
								<div className="form-group">
									<input className="form-control input-create-page" />
								</div>
								<button className="form-control btn btn-primary" onClick={this.createPage}>Create Page</button>
							</form>
						</div>
					</div>
				}/>

			</div>

		)
	}
}
