import { Meteor } from 'meteor/meteor';

Pages = new Mongo.Collection("pages");

Meteor.publish("editor.getPage", function(id) {
	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
		throw new Meteor.Error('not-authorized');
	}

	return Pages.find({"_id": id});
});

Meteor.publish("editor.getPages", function() {
	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
		throw new Meteor.Error('not-authorized');
	}

	return Pages.find();
});