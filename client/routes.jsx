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
import Card from "./components/Card.jsx";
import Page from "./components/Page.jsx";
import {Accounts} from "meteor/accounts-base";

Pages = new Mongo.Collection("pages");
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
		mount(MainLayout, {
			name: "team",
			category: "team",
			content: (<Team />)
		});
	}
});

FlowRouter.route('/team/edit', {
	action() {
		mount(MainLayout, {
			name: "edit",
			category: "team",
			content: (<Edit />)
		});
	}
});

FlowRouter.route('/team/edit/:page', {
	action(params) {
		mount(MainLayout, {
			name: "edit",
			category: "team",
			content: (<Editor page={params.page} />)
		});
	}
});

FlowRouter.route('/team/preview/:page', {
	action(params) {
		mount(MainLayout, {
			name: "edit",
			category: "team",
			content: (<Previewer page={params.page} />)
		});
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

FlowRouter.route('/team/admin', {
	action() {
		if (Accounts.userId()) {
			mount(MainLayout, {
				name: "login",
				category: "team",
				content: (<Card content="Authorized"/>)
			});
		} else {
			// FlowRouter.go('/team/login');
			mount(MainLayout, {
				name: "login",
				category: "team",
				content: (<Card content="Not Authorized"/>)
			});
		}
	}
});

// Reset the animation duration so moving between pages does not cause an animation
RouterAutoscroll.animationDuration = 0;