import { useTheme } from "../contexts/ThemeContext"
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import TeamsResults from "./Lists/TeamsResult";
import { useTeams } from "../contexts/TeamsContext";

const Teams = () => {
  const {colors} = useTheme()
  const styles = getStyles(colors)
  return (
    <View style={styles.teams}>
      <Text style={styles.teamsText}>Teams</Text>
      <TeamsResults />
      <Pressable style={styles.addTeamBtn}>
        <Text style={styles.addTeamTxt}>New Team</Text>
      </Pressable>
    </View>
  )
}

const getStyles = (colors) => {
  return StyleSheet.create({
    teams: {
      paddingTop: 55,
      paddingHorizontal: 40,
    },
    teamsText: {
      color: colors.darkTextColor,
      fontWeight: "bold",
      fontSize: 24,
      marginBottom: 60
    },
    addTeamBtn: {
      marginTop: "auto",
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: "100%",
      backgroundColor: colors.primaryColor,
      borderRadius: 10
    },
    addTeamTxt: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: colors.lightTextColor
    }
  })
}

export default Teams;