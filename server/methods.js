Meteor.methods({
	'editor.getPage'({page}) {
		if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'editor'])) {
			throw new Meteor.Error('not-authorized');
		}
		
		return Pages.findOne({"name": page});
	},
	'editor.updatePage'({page, content}) {
		if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'editor'])) {
			throw new Meteor.Error('not-authorized');
		}

		Pages.update({"name": page}, {$set: {"cards.0.content": content}});
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
