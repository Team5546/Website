import React from "react"

export default class Match extends React.Component {
  render() {
    let m = this.props.match
    let match_type = "Match"
    switch(m.comp_level) {
      case "q":
        match_type = "Qual Match"
        break
      case "f":
        match_type = "Finals Match"
        break
      case "sf":
        match_type = "Semifinals Match"
        break
      case "qf":
        match_type = "Quarterfinals Match"
        break
      default:
        match_type = "Match"
        break
    }
    let winning_alliance = m.winning_alliance
    return (
      <div className="match-container">
        <table className="match">
          <thead>
            <tr className="match-name">
              <th colSpan="12" className="match-name-text">{ match_type + " " + m.match_number }</th>
              <th colSpan="4" className="match-info"><a href={"https://www.thebluealliance.com/match/" + m.key}><i className="fa fa-info-circle"></i></a></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {
                m.alliances.blue.team_keys.map((team_key, i) => {
                  return <td colSpan="4" className={"match-team-blue" + (team_key === "frc5546" ? " our-team" : "") + (winning_alliance === "blue" ? " winner" : "")} key={i}>{team_key.substring(3)}</td>
                })
              }
              <td colSpan="4" className={"match-score-blue" + (winning_alliance === "blue" ? " winner" : "")}>{m.alliances.blue.score === -1 || m.alliances.blue.score === null ? 'Not Played' : m.alliances.blue.score}</td>
            </tr>
            <tr>
              {
                m.alliances.red.team_keys.map((team_key, i) => {
                  return <td colSpan="4" className={"match-team-red" + (team_key === "frc5546" ? " our-team" : "") + (winning_alliance === "red" ? " winner" : "")} key={i}>{team_key.substring(3)}</td>
                })
              }
              <td colSpan="4" className={"match-score-red" + (winning_alliance === "red" ? " winner" : "")}>{m.alliances.red.score === -1 || m.alliances.red.score === null ? 'Not Played' : m.alliances.red.score}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
