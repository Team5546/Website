import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";

var amazonSmile = '<div id="amznCharityBanner"><script type="text/javascript">(function() {var iFrame = document.createElement("iframe"); iFrame.style.display = "none"; iFrame.style.border = "none"; iFrame.width = 310; iFrame.height = 256; iFrame.setAttribute && iFrame.setAttribute("scrolling", "no"); iFrame.setAttribute("frameborder", "0"); setTimeout(function() {var contents = (iFrame.contentWindow) ? iFrame.contentWindow : (iFrame.contentDocument.document) ? iFrame.contentDocument.document : iFrame.contentDocument; contents.document.open(); contents.document.write(decodeURIComponent("%3Cdiv%20id%3D%22amznCharityBannerInner%22%3E%3Ca%20href%3D%22https%3A%2F%2Fsmile.amazon.com%2Fch%2F81-2571365%22%20target%3D%22_blank%22%3E%3Cdiv%20class%3D%22text%22%20height%3D%22%22%3E%3Cdiv%20class%3D%22support-wrapper%22%3E%3Cdiv%20class%3D%22support%22%20style%3D%22font-size%3A%2018px%3B%20line-height%3A%2021px%3B%20margin-top%3A%201px%3B%20margin-bottom%3A%201px%3B%22%3ESupport%20%3Cspan%20id%3D%22charity-name%22%20style%3D%22display%3A%20inline-block%3B%22%3EPARENT%20BOOSTER%20USA%20INC%20-%20Appomattox%20Robotics%20Team%20Booster%20Club.%3C%2Fspan%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cp%20class%3D%22when-shop%22%3EWhen%20you%20shop%20at%20%3Cb%3Esmile.amazon.com%2C%3C%2Fb%3E%3C%2Fp%3E%3Cp%20class%3D%22donates%22%3EAmazon%20donates.%3C%2Fp%3E%3C%2Fdiv%3E%3C%2Fa%3E%3C%2Fdiv%3E%3Cstyle%3E%23amznCharityBannerInner%7Bbackground-image%3Aurl(https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FG%2F01%2Fx-locale%2Fpaladin%2Fcharitycentral%2Fbanner-background-image._CB309675353_.png)%3Bwidth%3A300px%3Bheight%3A250px%3Bposition%3Arelative%7D%23amznCharityBannerInner%20a%7Bdisplay%3Ablock%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Arelative%3Bcolor%3A%23000%3Btext-decoration%3Anone%7D.text%7Bposition%3Aabsolute%3Btop%3A20px%3Bleft%3A15px%3Bright%3A15px%3Bbottom%3A100px%7D.support-wrapper%7Boverflow%3Ahidden%3Bmax-height%3A86px%7D.support%7Bfont-family%3AArial%2Csans%3Bfont-weight%3A700%3Bline-height%3A28px%3Bfont-size%3A25px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.when-shop%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A25px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.donates%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A21px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D%3C%2Fstyle%3E")); contents.document.close(); iFrame.style.display = "block";}); document.getElementById("amznCharityBanner").appendChild(iFrame); })(); </script></div>';

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
							If you would like to easily donate to our team, you may do so via PayPal with the button below, or you can contact us at the email, phone, or address listed in the <a href="/page/contact">About <i className="fa fa-long-arrow-right"></i> Contact Us</a> page.
						</p>
						<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
							<input type="hidden" name="cmd" value="_s-xclick" />
							<input type="hidden" name="hosted_button_id" value="KL3EVW5DDECVU" />
							<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" name="submit" alt="PayPal - The safer, easier way to pay online!" />
							<img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
						</form>
					</div>
				}/>

				<Card title="Amazon Smile" content={
					<div>
						<p><a href="https://smile.amazon.com/ch/81-2571365">Please also add us as your charity on Amazon Smile!</a> By shopping at smile.amazon.com, Amazon will donate part of their profits from your purchase to our robotics team!</p>
						<a href="https://smile.amazon.com/ch/81-2571365"><img src="https://static.argsrobotics.com/amazonsmile.png" /></a>
					</div>
				}/>
			</div>
		)
	}
}
