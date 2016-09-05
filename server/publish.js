import { Meteor } from 'meteor/meteor';

// Page editor
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


// Users page
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


// Home page
Meteor.publish("alerts.getAlerts", function() {
	return Settings.find({"name": "alert"});
});



// Banners page
Meteor.publish("banners.getBanners", function() {
	return BannersCollection.find({}, {sort: {position: -1}});
});



// Sponsors
Meteor.publish("sponsors.getSponsors", function() {
	return SponsorCollection.find({}, {sort: {name: 1}});
});