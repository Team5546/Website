import React from "react";
import {mount} from "react-mounter";
import {MainLayout} from "./layouts/MainLayout.jsx";
import {HomeLayout} from "./layouts/HomeLayout.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Robots from "./pages/robots/Robots.jsx";
import Sponsors from "./pages/sponsors/Sponsors.jsx";
import Navbar from "./components/Navbar.jsx";
import IntroVideo from "./components/IntroVideo.jsx";

FlowRouter.route('/', {
	action() {
		mount(HomeLayout, {
			name: "home",
			category: "home",
			content: (<Home />),
			navbar: (<Navbar />),
			introVideo: (<IntroVideo />)
		});
	}
});

FlowRouter.route('/about', {
	action() {
		mount(MainLayout, {
			name: "about",
			category: "about",
			content: (<About />),
			navbar: (<Navbar />)
		});
	}
});

FlowRouter.route('/about/robots', {
	action() {
		mount(MainLayout, {
			name: "about-robots",
			category: "about",
			content: (<Robots />),
			navbar: (<Navbar />)
		});
	}
});

FlowRouter.route('/sponsors', {
	action() {
		mount(MainLayout, {
			name: "sponsors",
			category: "sponsors",
			content: (<Sponsors />),
			navbar: (<Navbar />)
		});
	}
});

// Reset the animation duration so moving between pages does not cause an animation
RouterAutoscroll.animationDuration = 0;