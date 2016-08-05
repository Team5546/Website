import React from "react";
import {mount} from "react-mounter";
import {MainLayout} from "./layouts/MainLayout.jsx";
import {HomeLayout} from "./layouts/HomeLayout.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Robots from "./pages/robots/Robots.jsx";
import Sponsors from "./pages/sponsors/Sponsors.jsx";
import Login from "./pages/team/Login.jsx";
import Team from "./pages/team/Team.jsx";
import Edit from "./pages/team/Edit.jsx";
import Card from "./components/Card.jsx";
import Page from "./components/Page.jsx";
import {Accounts} from "meteor/accounts-base";

FlowRouter.route('/', {
	action() {
		mount(HomeLayout, {
			name: "home",
			category: "home",
			content: (<Home />)
		});
	}
});

FlowRouter.route('/about', {
	action() {
		mount(MainLayout, {
			name: "about",
			category: "about",
			content: (<About />)
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

FlowRouter.route('/page/', {
	action() {
		mount(MainLayout, {
			name: "test",
			category: "test",
			content: (<Page name="Test"/>)
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