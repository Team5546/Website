import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";


export default class Sponsors extends TrackerReact(React.Component) {

	render() {
		return (
			<div>
				<Card title="Sponsors and Donors" content={
					<div className="sponsors">
						<strong>Your name here!</strong> Please consider sponsoring the ARGS Robotics Team. Among the many thanks that you will receive, we will promote your business through this website, in our pit at competitions, and on our robot. Please contact us if you are interested in making a donation.
					</div>
				}/>

				<div className="sponsors-left col-sm-6">
					<Card content={
						<div>
							<a href="http://www.bechtel.com/"><img src="/res/img/sponsors/bechtel.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://www.absnt.com/"><img src="/res/img/sponsors/abs.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://www.ekocycle.com/"><img src="/res/img/sponsors/ekocycle.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://www.lemaker.org/"><img src="/res/img/sponsors/lemaker.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://parhamswelding.com/"><img src="/res/img/sponsors/parhams.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://www.jamesriverequipment.com/"><img src="/res/img/sponsors/jamesriverequipment.svg" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://relayelectric.com/"><img src="/res/img/sponsors/relay.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://realestatebyharris.com/"><img src="/res/img/sponsors/harris.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
				</div>

				<div className="sponsors-right col-sm-6">
					<Card content={
						<div>
							<a href="http://www.utc.com/"><img src="/res/img/sponsors/unitedtechnologies.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://www.rbc.edu/"><img src="/res/img/sponsors/richardbland.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://www.argosyfnd.org/"><img src="/res/img/sponsors/argosy.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://www.joesinnbonair.com/"><img src="/res/img/sponsors/joesinn.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://www.allenandallen.com/"><img src="/res/img/sponsors/allenallen.png" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<a href="http://dataaccess.com/"><img src="/res/img/sponsors/dataaccess.svg" className="sponsor img-responsive center-block" /></a>
						</div>
					}/>
					<Card content={
						<div>
							<h4>Jen's Cut N Curl</h4>
							<h4>Spencer Brothers, Inc.</h4>
							<h4>Battle Boats</h4>
							<h4>Sidetrack Hair Designs</h4>
						</div>
					}/>
					<Card title="Our Donors" content={
						<div>
							<h4>David Aylesworth</h4>
							<h4>Lanette Battles</h4>
							<h4>Debra Carlotti</h4>
							<h4>Susan Coggins</h4>
							<h4>Stephen Douglas</h4>
							<h4>Brenda Garrett</h4>
							<h4>Nadine Hoffman</h4>
							<h4>Cecil and Linda King</h4>
							<h4>Joey And M.A.</h4>
							<h4>Judith Marks</h4>
							<h4>Scott &amp; Patty Morton</h4>
							<h4>Steve Mulloy</h4>
							<h4>Patrice Richman</h4>
							<h4>Henry Rozycki</h4>
							<h4>William Wendt</h4>
							<h4>Kathleen Whittle</h4>
						</div>
					}/>
				</div>
			</div>
		)
	}
}
