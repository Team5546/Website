import { default as UUID } from "node-uuid";

function authenticate(roles) {
	if (!Roles.userIsInRole(Meteor.userId(), roles)) {
		throw new Meteor.Error('not-authorized');
	}
}

Meteor.methods({
	'editor.getPage'({page}) {
		authenticate(['admin', 'editor']);
		return Pages.findOne({"name": page});
	},

	'editor.updatePage'({page, cards}) {
		authenticate(['admin', 'editor']);
		return Pages.update({"name": page}, {$set: {"cards": cards}});
	},

	'editor.createPage'(name) {
		authenticate(['admin', 'editor']);
		Pages.insert({
			"name": name,
			"cards": []
		});
	},

	'editor.deletePage'(name) {
		authenticate(['admin', 'editor']);
		Pages.remove({"name": name});
	},

	'editor.addCard'(name) {
		authenticate(['admin', 'editor']);
		Pages.update({"name": name}, {$push: {"cards": {"id": UUID.v4(),"title": "", "content": ""}}});
	},

	'editor.deleteCard'({name, id}) {
		authenticate(['admin', 'editor']);
		Pages.update({"name": name}, {$pull: {"cards": {"id": id}}});
	}
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
	return user.services.google.email.endsWith("@args.us") || user.services.google.email.endsWith("@argsrobotics.com");
}