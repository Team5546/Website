import { Meteor } from 'meteor/meteor';

Meteor.publish("editor.getPage", function(id) {
	check(id, String);
	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
		throw new Meteor.Error('not-authorized');
	}

	return Pages.find({"_id": id});
});

Meteor.publish("editor.getPageByName", function(name) {
	check(name, String);
	return Pages.find({"name": name});
});

Meteor.publish("editor.getPages", function() {
	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
		throw new Meteor.Error('not-authorized');
	}

	return Pages.find();
});

Meteor.publish("users.getAuthorizedUsers", function() {
	if (!Roles.userIsInRole(this.userId, ['admin'])) {
		throw new Meteor.Error('not-authorized');
	}

	return AuthorizedUsers.find({}, {sort: {role: 1}});
});

Meteor.publish("users.getUsers", function() {
	if (!Roles.userIsInRole(this.userId, ['admin'])) {
		throw new Meteor.Error('not-authorized');
	}

	return Meteor.users.find({}, {sort: {roles: 1}});
});