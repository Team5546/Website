import React from 'react'
import TrackerReact from "meteor/ultimatejs:tracker-react";
import Card from "../../components/Card.jsx";

export default class LoginFailed extends TrackerReact(React.Component) {
  render() {
    return (
      <div>
				<Card title="Login Failed" content={
					<div>
						<div style={{marginBottom: "30px"}}>
							Sorry user account not found. If you feel this is an error, contact a site admin.
						</div>
						<a href="/team/login" className="btn btn-primary"><i className="fa fa-long-arrow-left"></i> Back to login</a>
					</div>
				}/>
			</div>
    )
  }
}
