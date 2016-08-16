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
	},

	'users.addAuthorizedUser'({email, role}) {
		authenticate(['admin']);
		check(email, String);
		check(role, String);
		AuthorizedUsers.insert({"email": email, "role": role});
	},

	'users.deleteUser'({id}) {
		authenticate(['admin']);
		check(id, String);
		Meteor.users.remove({"services.google.email": AuthorizedUsers.findOne({"_id": id}).email});
		AuthorizedUsers.remove({"_id": id});
		Meteor.users.remove({"_id": id});
	},
	
	'users.setRole'({id, role}) {
		authenticate(['admin']);
		check(id, String);
		check(role, String);
		AuthorizedUsers.update({"_id": id}, {$set: {"role": role}});
		var user = Meteor.users.findOne({"services.google.email": AuthorizedUsers.findOne({"_id": id}).email});
		if (user) {
			Roles.setUserRoles(user._id, role);
		}
	},

	'alerts.setAlert'({type, message, expire}) {
		authenticate(['admin']);
		expire = parseInt(expire);
		check(type, String);
		check(message, String);
		check(expire, Number);
		var expirationDate = new Date();
		expirationDate.setHours(24 * ++expire, 0, 0, 0);
		Settings.update({"name": "alert"}, {$set: {"type": type, "message": message, "expire": expirationDate}});
	},

	'alerts.clearAlert'() {
		authenticate(['admin']);
		Settings.update({"name": "alert"}, {$set: {"expire": new Date()}});
	}
});