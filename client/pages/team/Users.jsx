import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";

AuthorizedUsers = new Mongo.Collection("authorizedUsers");

export default class Users extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("users.getAuthorizedUsers");
		Meteor.subscribe("users.getUsers");
	}

	addUser(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		Meteor.call("users.addAuthorizedUser", {
			"email": $(".user-email").val(),
			"role": $(".user-role").val()
		}, function (err) {
			if (!err) {
				$(".user-email").val("");
			}
		});
	}

	deleteUser(id) {
		if (confirm("Are you sure you want to remove this user?")) {
			Meteor.call("users.deleteUser", {
				"id": id
			});
		}
	}

	setRole(id, index) {
		Meteor.call("users.setRole", {
			"id": id,
			"role": $(".set-user-role").eq(index).val()
		});
	}

	render() {
		let users = AuthorizedUsers.find();
		let usersLoggedIn = Meteor.users.find();
		if (!users || !usersLoggedIn) {
			return (<div></div>)
		}

		return (
			<div className="edit">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader active="users"/>

						<h3>New User</h3>
						<form onSubmit={this.addUser} className="form-inline form-new-user">
							<div className="form-group">
								<input type="email" className="form-control user-email" placeholder="Email"/>
							</div>
							<div className="form-group">
								<select className="form-control user-role">
									<option value="user">User</option>
									<option value="admin">Admin</option>
									<option value="editor">Editor</option>
									<option value="mentor">Mentor</option>
									<option value="parent">Parent</option>
								</select>
							</div>
							<div className="form-group">
								<button type="submit" onClick={this.addUser} className="btn btn-default">Add User</button>
							</div>
						</form>

						<ul className="list-group">
							{users.map((user, index)=> {
								let color;
								switch(user.role) {
									case "admin":
										color = "danger";
										break;
									case "editor":
										color = "warning";
										break;
									case "mentor":
										color = "success";
										break;
									case "parent":
										color = "info";
										break;
									default:
										color = "default";
								}
								return (
								<li className="list-group-item" key={user._id}>
									<form className="form-inline form-change-role ">
										<div className="input-group">
										    <select className="form-control set-user-role">
												<option value="user">User</option>
												<option value="admin">Admin</option>
												<option value="editor">Editor</option>
												<option value="mentor">Mentor</option>
												<option value="parent">Parent</option>
											</select>
										    <span className="input-group-btn">
										        <a onClick={this.setRole.bind(this, user._id, index)} className="btn btn-default">Set</a>
											</span>
									    </div>
								    </form>
									<span className={`label label-${color} label-role`}> {user.role} </span>&nbsp;
									{user.email}
									<i className="fa fa-trash-o btn-delete-user" onClick={this.deleteUser.bind(this, user._id)}> </i>

								</li>)
							})}
						</ul>
					</div>
				}/>

			</div>

		)
	}
}
