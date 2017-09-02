import React from "react";
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../components/Card.jsx";

export default class NotFound extends TrackerReact(React.Component) {
  render() {
    return (
      <div>
				<Card title="404 - Page Not Found" content={
					<div>
						<div style={{marginBottom: "30px"}}>
							Sorry the requested page not found. If you feel this is an error, contact a site admin.
						</div>
						<a href="/" className="btn btn-primary"><i className="fa fa-long-arrow-left"></i> Back to home</a>
					</div>
				}/>
			</div>
    )
  }
}
