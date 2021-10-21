import React, { useEffect, useState } from "react";
import { database } from "../components/database";

export const TeamsContext = React.createContext({});

export const TeamsProvider = (props) => {
  const {
    teams: initialTeams,
    children
  } = props;
  const [teams, setTeams] = useState(initialTeams)
  useEffect(() => {
    refreshTeams();
  }, [])
  const addNewTeam = (teamName) => {
    return database.insertTeam(teamName, refreshTeams)
  }
  const refreshTeams = () => {
    return database.getTeams(setTeams)
  }
  const teamsContext = {
    teams,
    addNewTeam
  }
  return (
    <TeamsContext.Provider value={teamsContext}>
      {children}
    </TeamsContext.Provider>
  )
}

export const useTeams = () => React.useContext(TeamsContext);