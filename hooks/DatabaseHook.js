//@refresh reset
import React, { useEffect, useState } from "react"
import { database } from "../components/database"

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = useState(false)

  useEffect(() => {
    async function loadDataAsync() {
      try {
        await database.dropDatabaseTablesAsync()
        await database.setupDatabaseAsync()
        await database.setupTeamsAsync()

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadDataAsync()
  }, [])
  return isDBLoadingComplete;
}