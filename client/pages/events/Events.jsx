import React from "react"
import axios from "axios"
import Card from "../../components/Card.jsx"
import Event from "../../components/Event.jsx"

let TBA_YEARS_URL = "https://www.thebluealliance.com/api/v3/team/frc5546/years_participated"
let TBA_EVENTS_URL = "https://www.thebluealliance.com/api/v3/team/frc5546/events/"
let API_KEY = "win8mmOEK5hLQnRuOxYXPXdXc06w4vZSmnLkpzjXm3uo8dBJGUMqQcZaDD9Rg0UF"

export default class Events extends React.Component {
  constructor() {
    super()
    this.state = {
      years: [],
      events: []
    }

    axios.get(TBA_YEARS_URL, {
      headers: {
        "x-tba-auth-key": API_KEY,
        "accept": "application/json"
      }
    }).then((response) => {
      this.setState({ years: response.data.sort((a, b) => b - a), selectedYear: response.data.sort((a, b) => b - a)[0] })
      this.getEvents()
    })

    this.handleYear = this.handleYear.bind(this)
  }

  getEvents(year=this.state.selectedYear) {
    axios.get(TBA_EVENTS_URL + year, {
      headers: {
        "x-tba-auth-key": API_KEY,
        "accept": "application/json"
      }
    }).then((response) => {
      this.setState({ events: response.data.sort((a, b) => {
        if(b.week === null) {
          if(b.event_type === 99) {
            b.week = 99
          } else {
            b.week = 20
          }
        }
        if(a.week === null) {
          if(a.event_type === 99) {
            a.week = 99
          } else {
            a.week = 20
          }
        }
        return b.week - a.week
      }) })
    })
  }

  handleYear(e) {
    this.setState({ selectedYear: e.target.value })
    this.getEvents(e.target.value)
  }

  render() {
    return (
      <div>
        <Card title="Select Year" content={
          <select onChange={this.handleYear}>
            {
              this.state.years.map((year, i) => {
                return <option key={i} value={year}>{year}</option>
              })
            }
          </select>
        }/>
        {
          this.state.events.map((event, i) => {
            return <Event key={i} event={event}/>
          })
        }
      </div>
    )
  }
}
