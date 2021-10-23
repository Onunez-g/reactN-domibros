import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTeams } from "../../contexts/TeamsContext";
import { useTheme } from "../../contexts/ThemeContext";
import { getListStyles } from "./Styles";

const TeamsResults = () => {
  const {teams, addNewTeam} = useTeams()
  const {colors} = useTheme()
  const listStyles = getListStyles(colors)
  const styles = getStyles(colors)
  return (
    <View style={{marginTop: 20}}>
      <View style={listStyles.headerRow}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Wins</Text>
        <Text style={styles.headerText}>Losses</Text>
      </View>
      <ScrollView style={styles.teamsBoard}>
        {teams.sort((f, s) => s.wins - f.wins || f.losses - s.losses).map(x => (
          <View key={x.id} style={listStyles.bodyRow}>
            <Text style={styles.nameText}>{x.name}</Text>
            <Text style={styles.winsText}>{x.wins}</Text>
            <Text style={styles.lossesText}>{x.losses}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default TeamsResults

const getStyles = (colors) => {
  return StyleSheet.create({
    headerText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.lightTextColor
    },
    nameText: {
      width: "20%",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "left",
      color: colors.darkTextColor
    },
    winsText: {
      width: "20%",
      textAlign: "right",
      color: colors.secondaryColor
    },
    lossesText: {
      width: "20%",
      textAlign: "right",
      color: colors.primaryColor
    },
    teamsBoard: {
      height: "70%"
    }
  })
}