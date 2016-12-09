import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import Banner from "../../components/Banner.jsx";
import DOMPurify from "dompurify";

export default class Home extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("banners.getBanners");
		Meteor.subscribe("settings.getHomepageContent");
	}

	render() {
		let banners = BannersCollection.find({}, {sort: {position: -1}});
		let settings = Settings.findOne({"category": "homepage"});

		if (!banners || !settings) {
			return (
				<div className="loader">Loading...</div>
			)
		}

		var metaInfo = {name: "description", content: Settings.findOne({"name": "homepage-about-content"}).content.substring(0, 150) + "..."};
		DocHead.addMeta(metaInfo);

		return (
			<div>
				<div className="banner-container">
					{banners.map((banner)=> {
						return <Banner key={banner._id}
						               year={banner.year}
						               lineOne={banner.lineOne}
						               lineTwo={banner.lineTwo}
						               competition={banner.competition}/>
					})}
				</div>

				<Card title="Our Team" content={
					<div>
						<p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(Settings.findOne({"name": "homepage-about-content"}).content)}}></p>
						<div className="row team-pics">
							<div className="col-xs-6 team-pics l-pic">
								<img src={"https://static.argsrobotics.com/" + Settings.findOne({"name": "about-left-image"}).image} className="img-responsive img-thumbnail team-pics team-pics-left" />
							</div>
							<div className="col-xs-6 team-pics r-pic">
								<img src={"https://static.argsrobotics.com/" + Settings.findOne({"name": "about-right-image"}).image} className="img-responsive img-thumbnail team-pics team-pics-right" />
							</div>
						</div>
					</div>
				}/>

				<Card title="What is FRC?" content={
					<div>
						<p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(Settings.findOne({"name": "homepage-first-content"}).content)}}></p>
					</div>
				}/>

				<Card title="Sponsors" content={
				<div className="sponsors">
					<div>
						<p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(Settings.findOne({"name": "homepage-sponsors-content"}).content)}}></p>
					</div>
					<div className="row">
					<div className="col-xs-12">
						<img src={"https://static.argsrobotics.com/" + Settings.findOne({"name": "sponsor-image"}).image} className="sponsor-image img-responsive" />
						</div>
					</div>
				</div>
				}/>
			</div>
		)
	}
}
