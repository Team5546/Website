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

	render() {
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
							<li><a href="/" className="menu-home">Home</a></li>
							<li className="dropdown menu-about">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">About</a>
								<ul className="dropdown-menu">
									<li><a href="/about/">Our Team</a></li>
									<li><a href="#">Team Structure</a></li>
									<li><a href="/about/robots/">Robots</a></li>
									<li><a href="#">School</a></li>
									<li><a href="#">Website</a></li>
									<li><a href="#">Contact Us</a></li>
								</ul>
							</li>
							<li className="dropdown menu-resources">
								<a href="/resources/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Resources</a>
								<ul className="dropdown-menu">
									<li><a href="#">Manuals and Guides</a></li>
									<li><a href="#">Software</a></li>
									<li><a href="#">Media Kit</a></li>
								</ul>
							</li>
							<li className="menu-sponsors"><a href="/sponsors/">Sponsors</a></li>
							<li className="menu-team"><a href="">Team</a></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}
