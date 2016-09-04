import React from "react";
import {mount} from "react-mounter";
import {MainLayout} from "./layouts/MainLayout.jsx";
import {HomeLayout} from "./layouts/HomeLayout.jsx";
import Home from "./pages/home/Home.jsx";
import Robots from "./pages/robots/Robots.jsx";
import Sponsors from "./pages/sponsors/Sponsors.jsx";
import Login from "./pages/team/Login.jsx";
import Team from "./pages/team/Team.jsx";
import Edit from "./pages/team/Edit.jsx";
import Editor from "./pages/team/Editor.jsx";
import Previewer from "./pages/team/Previewer.jsx";
import Users from "./pages/team/Users.jsx";
import Alerts from "./pages/team/Alerts.jsx";
import Banners from "./pages/team/Banners.jsx";
import TeamSettings from "./pages/team/TeamSettings.jsx";
import Page from "./components/Page.jsx";
import {Accounts} from "meteor/accounts-base";

Pages = new Mongo.Collection("pages");
Settings = new Mongo.Collection("settings");
BannersCollection = new Mongo.Collection("banners");
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

FlowRouter.route('/page/:name', {
	action(params) {
		mount(MainLayout, {
			name: "page",
			content: (<Page name={params.name} />)
		});
	}
});

FlowRouter.notFound = {
	action() {
		FlowRouter.go("/");
	}
};

// Reset the animation duration so moving between pages does not cause an animation
RouterAutoscroll.animationDuration = 0;