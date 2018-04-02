import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class Navbar extends TrackerReact(React.Component) {

	constructor() {
		super();

		$(window).scroll(this.adjustNavbar);
		$(".navbar").addClass("navbar-maximized");
	}

	adjustNavbar() {
		var scroll = $(window).scrollTop();
		if (scroll < 5) {
			$(".navbar").addClass("navbar-maximized");
		} else {
			$(".navbar").removeClass("navbar-maximized");
		}
	}

	logout() {
		Meteor.logout();
	}

	render() {
		var userName = Meteor.user() ? Meteor.user().profile.name : "";

		let userInfo = null;

		if (Meteor.userId()) {
			userInfo = <li className="navbar-user-info">
				<span className="navbar-username">
					{userName}
				</span>
				<span className="navbar-logout">
					<button className="btn btn-default" onClick={this.logout}>Log Out</button>
				</span>
			</li>;
		}

		return (
			<nav className="navbar navbar-inverse navbar-fixed-top navbar-maximized">
				<div className="fit-width">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
						        data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="/"><img src="/res/logo.svg"/></a>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						<ul className="nav navbar-nav navbar-right">

							{userInfo}

							<li><a href="/" className="menu-home">Home</a></li>
							<li className="dropdown menu-about">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">About</a>
								<ul className="dropdown-menu">
									<li><a href="/page/about">Our Team</a></li>
									<li><a href="/page/team-structure">Team Structure</a></li>
									<li><a href="/about/robots/">Robots</a></li>
									<li><a href="/page/school">School</a></li>
									<li><a href="/page/website">Website</a></li>
									<li><a href="/page/contact">Contact Us</a></li>
								</ul>
							</li>
							<li className="dropdown menu-resources">
								<a href="/resources/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Resources</a>
								<ul className="dropdown-menu">
									<li><a href="/page/manuals-and-guides">Manuals and Guides</a></li>
									<li><a href="/page/software">Software</a></li>
									<li><a href="/page/media-kit">Media Kit</a></li>
									<li><a href="/page/calendar">Calendar</a></li>
								</ul>
							</li>
							<li className="dropdown menu-sponsors">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sponsors</a>
								<ul className="dropdown-menu">
									<li><a href="/sponsors">Our Sponsors</a></li>
									<li><a href="/sponsor-us">Become a Sponsor</a></li>
								</ul>
							</li>
							<li className="menu-team"><a href="/team">Team</a></li>
							<li className="menu-donate"><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KL3EVW5DDECVU">Donate</a></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}
