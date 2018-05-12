import React from "react"
import axios from "axios"
import moment from "moment"
import Card from "./Card.jsx"
import Match from "./Match.jsx"

let TBA_MATCHES_URL = "https://www.thebluealliance.com/api/v3/team/frc5546/event/"
let API_KEY = "win8mmOEK5hLQnRuOxYXPXdXc06w4vZSmnLkpzjXm3uo8dBJGUMqQcZaDD9Rg0UF"

export default class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      status: "Status Not Available"
    }

    axios.get(TBA_MATCHES_URL + props.event.key + "/matches", {
      headers: {
        "x-tba-auth-key": API_KEY,
        "accept": "application/json"
      }
    }).then((response) => {
      this.setState({ matches: response.data.sort((a, b) => b.time - a.time) })
    })

    axios.get(TBA_MATCHES_URL + props.event.key + "/status", {
      headers: {
        "x-tba-auth-key": API_KEY,
        "accept": "application/json"
      }
    }).then((response) => {
      this.setState({ status: response.data.overall_status_str })
    })
  }
  componentWillReceiveProps(nextProps) {
    axios.get(TBA_MATCHES_URL + nextProps.event.key + "/matches", {
      headers: {
        "x-tba-auth-key": API_KEY,
        "accept": "application/json"
      }
    }).then((response) => {
      this.setState({ matches: response.data.sort((a, b) => b.time - a.time) })
    })
  }
  render() {
    let e = this.props.event
    let week
    switch(e.week) {
      case 20:
        week = "World Championship"
        break
      case 99:
        week = "Offseason"
        break
      default:
        week = ("Week " + e.week)
        break
    }
    return (
      <Card title={e.name + " - " + week} content={
        <div className="event">
          <p className="date">
            { e.start_date !== e.end_date ? (
              (moment(e.start_date).format('MMM Do YYYY') + " - " + moment(e.end_date).format('MMM Do YYYY'))
            ) : (
              moment(e.start_date).format('MMM Do YYYY')
            )}</p>
          <a className="btn-google-maps" href={e.gmaps_url}><i className="fa fa-map-marker-alt"/> Google Maps</a>
          <p className="address"><em>{e.city}, {e.state_prov}, {e.country}</em></p>
          <br/>
          <p className="status" dangerouslySetInnerHTML={{__html: this.state.status}}></p>
          { this.state.matches.length === 0 ? (
            <h4 className="no-matches">No Matches Found</h4>
          ) : (
            ""
          )
          }
          {
            this.state.matches.map((match, i) => {
              return <Match key={i} match ={match}/>
            })
          }
        </div>
      }/>
    )
  }
}
