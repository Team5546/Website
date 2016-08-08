Meteor.methods({
	test: function() {
		console.log("test");
		return "test";
	},
	'editor.getPage'({page}) {
		if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'editor'])) {
			throw new Meteor.Error('not-authorized');
		}
		
		return Pages.findOne({"name": page});
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
