import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";


export default class SponsorUs extends TrackerReact(React.Component) {

	componentDidUpdate() {
		this.updateSponsorLevels();
	}

	componentDidMount() {
		this.updateSponsorLevels();
	}

	updateSponsorLevels() {
		function update() {
			$(".sponsor-benefits ul li").each(function(i, value) {
				if ($(".sponsor-benefits ul li").eq(i).hasClass($("#sponsor-slider").val())) {
					$(".sponsor-benefits ul li").eq(i).show();
				} else {
					$(".sponsor-benefits ul li").eq(i).hide();
				}

				switch($("#sponsor-slider").val()) {
					case "1":
						$(".sponsor-benefits-name").html("Lizard");
						$(".sponsor-amount").html("Less than $100");
						break;
					case "2":
						$(".sponsor-benefits-name").html("Basilisk");
						$(".sponsor-amount").html("$100+");
						break;
					case "3":
						$(".sponsor-benefits-name").html("Hydra");
						$(".sponsor-amount").html("$500+");
						break;
					case "4":
						$(".sponsor-benefits-name").html("Wyvern");
						$(".sponsor-amount").html("$1,000+");
						break;
					case "5":
						$(".sponsor-benefits-name").html("Dragon");
						$(".sponsor-amount").html("$5,000+");
						break;
				}
			});
		}
		$(document).ready(function () {
			update();

			$("#sponsor-slider").on("change mousemove", function() {
				update();
			});
		});
	}

	render() {
		return (
			<div>
				<Card title="Become a Sponsor" content={
					<div>
						<p>
							Please consider sponsoring the ARGS Robotics Team! Among the many thanks that you will receive, we will promote your business through this website, in our pit at competitions, and on our robot. Your company/organization will reach 14 different localities, cities, and counties throughout Virginia.
						</p>
						<div className="slider-container">
							<div className="sponsor-amount"></div>
							<input id="sponsor-slider" type="range" min="1" max="5" defaultValue="1" />
						</div>
						<div className="sponsor-benefits">
							<h2 className="sponsor-benefits-name"></h2>
							<ul>
								<li className="1 2 3 4 5">Our appreciation and thanks for supporting our team!</li>
								<li className="1 2 3 4 5">Name on our website and social media</li>
								<li className="2">Small logo on team t-shirts</li>
								<li className="3">Medium logo on team t-shirts</li>
								<li className="4 5">Large logo on team t-shirts</li>
								<li className="2 3">Logo posted in event pits (electronic sign)</li>
								<li className="4 5">Logo posted in event pits (permanent sign)</li>
								<li className="3">Name listed on our robot</li>
								<li className="4">Small logo displayed prominently on robot</li>
								<li className="5">Large logo displayed prominently on robot</li>
								<li className="4 5">T-shirts shipped to sponsor</li>
								<li className="4 5">Sponsor's name is announced at events</li>
								<li className="5">Within 50 miles from us, we'll take our robot directly to your company/organization for a demonstration</li>
							</ul>
						</div>
					</div>
				}/>

				<Card title="Donate" content={
					<div>
						<p>
							If you would like to easily donate to our team, you may do so via PayPal with the button below, or you can contact us at the email, phone, or address listed in the <a href="/page/contact">About -> Contact Us</a> page.
						</p>
						<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
							<input type="hidden" name="cmd" value="_s-xclick" />
							<input type="hidden" name="hosted_button_id" value="KL3EVW5DDECVU" />
							<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" name="submit" alt="PayPal - The safer, easier way to pay online!" />
							<img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
						</form>
					</div>
				}/>
			</div>
		)
	}
}
