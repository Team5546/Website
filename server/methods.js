import { default as UUID } from "node-uuid";

function authenticate(roles) {
	if (!Roles.userIsInRole(Meteor.userId(), roles)) {
		throw new Meteor.Error('not-authorized');
	}
}

Meteor.methods({
	'editor.getPage'({page}) {
		authenticate(['admin', 'editor']);
		check(page, String);
		return Pages.findOne({"name": page});
	},

	'editor.updatePage'({id, cards}) {
		authenticate(['admin', 'editor']);
		check(id, String);
		check(cards, Array);
		return Pages.update({"_id": id}, {$set: {"cards": cards}});
	},

	'editor.createPage'({name, title}) {
		authenticate(['admin', 'editor']);
		check(name, String);
		check(title, String);
		Pages.insert({
			"name": name,
			"title": title,
			"cards": []
		});
	},

	'editor.changeName'({id, name}) {
		authenticate(['admin', 'editor']);
		check(id, String);
		check(name, String);
		return Pages.update({"_id": id}, {$set: {"name": name}});
	},

	'editor.updateTitle'({id, title}) {
		authenticate(['admin', 'editor']);
		check(id, String);
		check(title, String);
		return Pages.update({"_id": id}, {$set: {"title": title}});
	},

	'editor.setCategory'({id, category}) {
		authenticate(['admin', 'editor']);
		check(id, String);
		check(category, String);
		return Pages.update({"_id": id}, {$set: {"category": category}});
	},

	'editor.deletePage'(id) {
		authenticate(['admin', 'editor']);
		check(id, String);
		Pages.remove({"_id": id});
	},

	'editor.addCard'(id) {
		authenticate(['admin', 'editor']);
		check(id, String);
		Pages.update({"_id": id}, {$push: {"cards": {"id": UUID.v4(),"title": "", "content": ""}}});
	},

	'editor.deleteCard'({id, cardId}) {
		authenticate(['admin', 'editor']);
		check(id, String);
		check(cardId, String);
		Pages.update({"_id": id}, {$pull: {"cards": {"id": cardId}}});
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