import { default as UUID } from "node-uuid";
var base64Img = Npm.require('base64-img');
var sanitize = Npm.require("sanitize-filename");
var fs = Npm.require('fs');

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
		Settings.update({"name": "alert"}, {$set: {"expire": new Date() - 60000 }});
	},

	'banners.addBanner'() {
		authenticate(['admin']);
		BannersCollection.insert({"position": "", "year": "", "lineOne": "", "lineTwo": "", "competition": ""});
	},

	'banners.updateBanner'({id, position, year, lineOne, lineTwo, competition}) {
		authenticate(['admin']);
		BannersCollection.update({"_id": id}, {$set: {"position": position, "year": year, "lineOne": lineOne, "lineTwo": lineTwo, "competition": competition}});
	},

	'banners.deleteBanner'({id}) {
		authenticate(['admin']);
		BannersCollection.remove({"_id": id});
	},

	'image.upload'({base64, name}) {
		authenticate(['admin', 'editor']);
		check(base64, String);
		check(name, String);
		base64Img.img(base64, Meteor.absolutePath + '/public/static/', sanitize(name), function(err, filepath) {});
	},

	'image.delete'({name}) {
		authenticate(['admin', 'editor']);
		check(name, String);
		fs.unlinkSync(Meteor.absolutePath + '/public/static/' + sanitize(name));
	},

	'sponsor.create'({name, website, level, image}) {
		authenticate(['admin']);
		check(name, String);
		check(website, String);
		check(level, String);
		check(image, String);
		SponsorCollection.insert({"name": name, "website": website, "level": level, "image": image});
	},

	'sponsor.update'({id, name, website, level, image}) {
		authenticate(['admin']);
		check(name, String);
		check(website, String);
		check(level, String);
		check(image, String);
		SponsorCollection.update({"_id": id}, {$set: {"name": name, "website": website, "level": level, "image": image}});
	},

	'sponsor.delete'({id}) {
		authenticate(['admin']);
		check(id, String);
		SponsorCollection.remove({"_id": id});
	},

	'settings.updateTeamHomeContent'({content}) {
		authenticate(['admin']);
		check(content, String);
		Settings.update({"name": "team-home-content"}, {$set: {"content": content}})
	},

	'settings.updateHomepageAboutContent'({content}) {
		authenticate(['admin', 'editor']);
		check(content, String);
		Settings.update({"name": "homepage-about-content"}, {$set: {"content": content}})
	},

	'settings.updateHomepageFirstContent'({content}) {
		authenticate(['admin', 'editor']);
		check(content, String);
		Settings.update({"name": "homepage-first-content"}, {$set: {"content": content}})
	},

	'settings.updateHomepageSponsorContent'({content}) {
		authenticate(['admin', 'editor']);
		check(content, String);
		Settings.update({"name": "homepage-sponsors-content"}, {$set: {"content": content}})
	},

	'settings.setLeftImage'({image}) {
		authenticate(['admin', 'editor']);
		check(image, String);
		Settings.update({"name": "about-left-image"}, {$set: {"image": image}})
	},

	'settings.setRightImage'({image}) {
		authenticate(['admin', 'editor']);
		check(image, String);
		Settings.update({"name": "about-right-image"}, {$set: {"image": image}})
	},

	'settings.setSponsorImage'({image}) {
		authenticate(['admin', 'editor']);
		check(image, String);
		Settings.update({"name": "sponsor-image"}, {$set: {"image": image}})
	},
	
	'robot.create'({year}) {
		authenticate(['admin', 'editor']);
		check(year, String);
		RobotsCollection.insert({"year": year, "name": "", "description": "", "leftImage": "", "rightImage": "", "centerImage": ""});
	},

	'robot.update'({id, year, name, description, leftImage, rightImage, centerImage}) {
		authenticate(['admin', 'editor']);
		check(id, String);
		check(year, String);
		check(name, String);
		check(description, String);
		check(leftImage, String);
		check(rightImage, String);
		check(centerImage, String);
		RobotsCollection.update({"_id": id}, {$set: {"year": year, "name": name, "description": description, "leftImage": leftImage, "rightImage": rightImage, "centerImage": centerImage}});
	},

	'robot.delete'({id}) {
		authenticate(['admin', 'editor']);
		check(id, String);
		RobotsCollection.remove({"_id": id});
	}
});