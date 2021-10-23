import React, { useEffect, useState } from "react";
import { database } from "../components/Database";

export const TeamsContext = React.createContext({});

export const TeamsProvider = (props) => {
  const {
    teams: initialTeams,
    children
  } = props;
  const [teams, setTeams] = useState(initialTeams)
  const [selectedTeam1, setTeam1] = useState({})
  const [selectedTeam2, setTeam2] = useState({})
  useEffect(() => {
    refreshTeams();
    setTeam1(teams[0])
    setTeam2(teams[1])
  }, [])
  const addNewTeam = (teamName) => {
    return database.insertTeam(teamName, refreshTeams)
  }
  const updateTeam = (team) => {
    console.log(team)
    return database.updateTeam(team.name, team.wins, team.losses)
  }
  const selectTeams = (id1, id2) => {
    let firstTeam = teams.filter(x => x.id === id1)[0]
    let secondTeam = teams.filter(x => x.id === id2)[0]
    setTeam1(firstTeam)
    setTeam2(secondTeam)
  }
  const refreshTeams = () => {
    return database.getTeams(setTeams)
  }
  const teamsContext = {
    teams,
    selectedTeam1,
    selectedTeam2,
    selectTeams,
    addNewTeam,
    updateTeam,
    refreshTeams
  }
  return (
    <TeamsContext.Provider value={teamsContext}>
      {children}
    </TeamsContext.Provider>
  )
}

export const useTeams = () => React.useContext(TeamsContext);