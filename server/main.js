import { Meteor } from 'meteor/meteor';

Pages = new Mongo.Collection("pages");
AuthorizedUsers = new Mongo.Collection("authorizedUsers");
Settings = new Mongo.Collection("settings");
BannersCollection = new Mongo.Collection("banners");
SponsorCollection = new Mongo.Collection("sponsors");
RobotsCollection = new Mongo.Collection("robots");

Meteor.startup(() => {

});

/* Current Meteor allows the user to update their own profile. This prevents
 this from happening, allowing use of secure items in the profile like setting
 admin, etc. Meteor may implement this in the future but this is required now. */
Meteor.users.deny({
	update: function() {
		return true;
	}
});


/* Validate the login attempt so that only users with emails ending in certain
 sub-domains are allowed. We don't want any random Google user logging in. */

Accounts.validateLoginAttempt(function(info) {
	return userIsValid(info.user);
});

function userIsValid(user) {
	var authUser = AuthorizedUsers.findOne({"email" : user.services.google.email});
	console.log(authUser)
	if(authUser !== null) {
		return true;
	} else {
		FlowRouter.go("team/loginfailed");
		return false;
	}
}



Accounts.onLogin(function(info) {
	var authUser = AuthorizedUsers.findOne({"email" : info.user.services.google.email});
	Roles.addUsersToRoles(info.user._id, authUser.role);
});
