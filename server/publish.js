import { Meteor } from 'meteor/meteor';

Pages = new Mongo.Collection("pages");

Meteor.publish("getPage", function(page) {
	return Pages.find({"name": page});
});