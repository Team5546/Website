import { Meteor } from 'meteor/meteor';

Pages = new Mongo.Collection("pages");

Meteor.publish("getPage", function(page) {
	return Pages.find({"name": page});
});

Meteor.publish("editor.getPages", function() {
	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
		throw new Meteor.Error('not-authorized');
	}

	return Pages.find();
});