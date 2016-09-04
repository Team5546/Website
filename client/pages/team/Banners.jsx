import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";
import TeamTitle from "../../components/TeamTitle.jsx";
import TeamHeader from "../../components/TeamHeader.jsx";
import Banner from "../../components/Banner.jsx";
import DOMPurify from "dompurify";

export default class Banners extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		Meteor.subscribe("banners.getBanners");
	}

	deleteBanner(id) {
		if (confirm("Are you sure you want to delete this banner?")) {
			Meteor.call("banners.deleteBanner", {
				"id": id
			});
		}
	}

	updateBanner(id, index) {
		Meteor.call("banners.updateBanner", {
			"id": id,
			"position": $(".banner-position").eq(index).val(),
			"year": $(".banner-year").eq(index).val(),
			"lineOne": $(".banner-lineOne").eq(index).val(),
			"lineTwo": $(".banner-lineTwo").eq(index).val(),
			"competition": $(".banner-competition").eq(index).val()
		}, function(err) {
			if (!err) {
				Bert.alert({
					message: "Banner saved",
					type: "success",
					style: "growl-top-right",
					icon: "fa-check"
				});
			}
		});
	}

	addBanner() {
		Meteor.call("banners.addBanner");
	}

	render() {
		let banners = BannersCollection.find({}, {sort: {position: -1}});

		if (!banners) {
			return (
				<div></div>
			)
		}

		return (
			<div className="banners">
				<Card title={<TeamTitle />} content={
					<div>
						<TeamHeader/>
						<div>
						<button className="btn btn-primary" onClick={this.addBanner}>Add Banner</button>
							{banners.map((banner, index)=> {
								return (
									<div key={banner._id}>
										<hr />
										<div className="banner-preview">
											<Banner year={banner.year} lineOne={banner.lineOne} lineTwo={banner.lineTwo} competition={banner.competition} />
										</div>
										<div className="banner-form">
											Position <input className="banner-input banner-position form-control" type="number" defaultValue={banner.position} /><br />
											Year <input className="banner-input banner-year form-control" defaultValue={banner.year} /><br />
											Line One <input className="banner-input banner-lineOne form-control" defaultValue={banner.lineOne} /><br />
											Line Two <input className="banner-input banner-lineTwo form-control" defaultValue={banner.lineTwo} /><br />
											Competition <input className="banner-input banner-competition form-control" defaultValue={banner.competition} /><br />
											<button className="btn btn-primary" onClick={this.updateBanner.bind(this, banner._id, index)}>Save</button>
											<button className="btn btn-danger" onClick={this.deleteBanner.bind(this, banner._id)}>Delete</button>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				}/>
			</div>

		)
	}
}
