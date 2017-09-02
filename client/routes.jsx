import React from "react";
import {mount} from "react-mounter";
import {MainLayout} from "./layouts/MainLayout.jsx";
import {HomeLayout} from "./layouts/HomeLayout.jsx";
import Home from "./pages/home/Home.jsx";
import Robots from "./pages/robots/Robots.jsx";
import Sponsors from "./pages/sponsors/Sponsors.jsx";
import SponsorUs from "./pages/sponsors/SponsorUs.jsx";
import Login from "./pages/team/Login.jsx";
import LoginFailed from "./pages/team/LoginFailed.jsx";
import Team from "./pages/team/Team.jsx";
import Edit from "./pages/team/Edit.jsx";
import Editor from "./pages/team/Editor.jsx";
import Previewer from "./pages/team/Previewer.jsx";
import Users from "./pages/team/Users.jsx";
import Alerts from "./pages/team/Alerts.jsx";
import Banners from "./pages/team/Banners.jsx";
import TeamSponsors from "./pages/team/TeamSponsors.jsx";
import SponsorEditor from "./pages/team/SponsorEditor.jsx";
import TeamSettings from "./pages/team/TeamSettings.jsx";
import TeamRobots from "./pages/team/TeamRobots.jsx";
import EditRobot from "./pages/team/EditRobot.jsx";
import NotFound from "./pages/NotFound.jsx"
import Page from "./components/Page.jsx";
import {Accounts} from "meteor/accounts-base";

Pages = new Mongo.Collection("pages");
Settings = new Mongo.Collection("settings");
BannersCollection = new Mongo.Collection("banners");
SponsorCollection = new Mongo.Collection("sponsors");
RobotsCollection = new Mongo.Collection("robots");
titleSuffix = " | ARGS Robotics Team";

Meteor.subscribe("editor.getPages");

FlowRouter.route('/', {
	action() {
		mount(HomeLayout, {
			name: "home",
			category: "home",
			content: (<Home />)
		});
	}
});

FlowRouter.route('/about/robots', {
	action() {
		mount(MainLayout, {
			name: "about-robots",
			category: "about",
			content: (<Robots />)
		});
	}
});

FlowRouter.route('/sponsors', {
	action() {
		mount(MainLayout, {
			name: "sponsors",
			category: "sponsors",
			content: (<Sponsors />)
		});
	}
});

FlowRouter.route('/team/login', {
	action() {
		mount(MainLayout, {
			name: "login",
			category: "team",
			content: (<Login />)
		});
	}
});

FlowRouter.route('/team/loginfailed', {
	action() {
		mount(MainLayout, {
			name: "login-failed",
			category: "team",
			content: (<LoginFailed />)
		});
	}
});

FlowRouter.route('/team', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "team",
				category: "team",
				content: (<Team />)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/edit', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "edit",
				category: "team",
				content: (<Edit />)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/edit/:page', {
	action(params) {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "edit",
				category: "team",
				content: (<Editor page={params.page} />)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/preview/:page', {
	action(params) {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "edit",
				category: "team",
				content: (<Previewer page={params.page}/>)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/users', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "users",
				category: "team",
				content: (<Users />)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/alerts', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "alerts",
				category: "team",
				content: (<Alerts />)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/banners', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "banners",
				category: "team",
				content: (<Banners />)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/sponsors', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "team-sponsors",
				category: "team",
				content: (<TeamSponsors />)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/sponsors/edit/:id', {
	action(params) {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "sponsor-editor",
				category: "team",
				content: (<SponsorEditor id={params.id}/>)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/settings', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "settings",
				category: "team",
				content: (<TeamSettings />)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/robots', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "team-robots",
				category: "team",
				content: (<TeamRobots />)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/team/robots/edit/:id', {
	action(params) {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "robot-editor",
				category: "team",
				content: (<EditRobot id={params.id}/>)
			});
		} else {
			FlowRouter.go("/team/login");
		}
	}
});

FlowRouter.route('/sponsor-us', {
	action() {
		mount(MainLayout, {
			name: "sponsor-us",
			category: "sponsors",
			content: (<SponsorUs />)
		});
	}
});

FlowRouter.route('/page/:name', {
	subscriptions: function(params, queryParams) {
		this.register('pageSubscription', Meteor.subscribe("editor.getPageByName", params.name));
	},
	action(params) {
		mount(MainLayout, {
			name: "page",
			content: (<Page name={params.name} />)
		});
	}
});

FlowRouter.route('/404', {
	action() {
		mount(MainLayout, {
			name: "404",
			content: (<NotFound />)
		})
	}
})

FlowRouter.notFound = {
	action() {
		FlowRouter.go("/404");
	}
};

// Reset the animation duration so moving between pages does not cause an animation
RouterAutoscroll.animationDuration = 0;
