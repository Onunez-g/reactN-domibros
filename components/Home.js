import React, { useState } from "react";
import { Keyboard, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import ScoreResult from "./Rounds/ScoreResult";
import TeamInput from "./TeamInput";

const Home = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors)
  const [score, setScore] = useState({
    Them: "",
    Us: ""
  })
  const [scores, setScores] = useState([])
  const onScoreChange = (to, value) => {
    setScore({...score, [to]: value})
  }
  const onAddRound = () => {
    Keyboard.dismiss()
    let round = {
      Them: score.Them != "" ? +score.Them : 0,
      Us: score.Us != "" ? +score.Us : 0
    }
    setScores([...scores, round])
    setScore({
      Them: "",
      Us: ""
    })
  }
  return (
    <View style={styles.home}>
      <View style={styles.basicSettings}>
        <Text style={styles.changeTeamText}>
          Change teams
        </Text>
        <TouchableOpacity style={styles.newGameBtn}>
          <Text style={styles.newGameText}>New</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.teams}>
        <TeamInput name="Them" value={score.Them} onValueChange={onScoreChange} color={colors.secondaryColor}/>
        <TeamInput name="Us" value={score.Us} onValueChange={onScoreChange} color={colors.primaryColor}/>
      </View>
      <TouchableOpacity onPress={onAddRound} style={styles.addBtn}>
        <Text style={styles.addTxt}>Add round</Text>
      </TouchableOpacity>
      <ScoreResult scores={scores}/>
    </View>
  );
};

export default Home;

const getStyles = (colors) => {
  return StyleSheet.create({
    home: {
      paddingTop: 75,
      paddingHorizontal: 40
    },
    basicSettings: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    changeTeamText: {
      color: colors.darkTextColor,
      fontWeight: "bold",
      fontSize: 18
    },
    newGameBtn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.secondaryColor,
      borderRadius: 10
    },
    newGameText: {
      color: colors.lightTextColor,
      fontSize: 18,
      fontWeight: "bold"
    },
    teams: {
      paddingHorizontal: 15,
      marginTop: 40,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    addBtn : {
      width: "100%",
      paddingVertical: 15,
      backgroundColor: colors.primaryColor,
      opacity: 70,
      borderRadius: 10,
      marginTop: 30
    },
    addTxt: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.lightTextColor,
      textAlign: "center"
    }
  });
};