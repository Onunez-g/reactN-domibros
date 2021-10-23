import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTeams } from "../contexts/TeamsContext";
import { useTheme } from "../contexts/ThemeContext";
import ScoreResult from "./Lists/ScoreResult";
import TeamInput from "./TeamInput";
import { database } from "./Database";

const cleanScore = {
  Them: "",
  Us: "",
};

const Home = () => {
  const { colors } = useTheme();
  const { selectedTeam1, selectedTeam2, updateTeam, refreshTeams } = useTeams();
  const styles = getStyles(colors);
  const [score, setScore] = useState(cleanScore);
  const [scores, setScores] = useState([]);

  const onScoreChange = (to, value) => {
    setScore({ ...score, [to]: value });
  };
  useEffect(() => {
    checkWinner()
  }, [scores])
  const refreshMatch = () => {
    database.getMatch(setScores)
  }
  const onAddRound = () => {
    Keyboard.dismiss();
    let round = {
      Them: score.Them != "" ? +score.Them : 0,
      Us: score.Us != "" ? +score.Us : 0,
    };
    database.insertRound(round.Them, round.Us, refreshMatch)
    setScore(cleanScore);
  };
  const onRemoveRound = (id) => {
    database.removeRound(id, refreshMatch)
  }
  const checkWinner = () => {
    let themTotalScore = scores.reduce((acc, x) => acc + x.them, 0);
    let usTotalScore = scores.reduce((acc, x) => acc + x.us, 0);
    if (themTotalScore >= 200 || usTotalScore >= 200) {
      let winner = "";
      if (themTotalScore >= 200) {
        selectedTeam2.wins += 1;
        selectedTeam1.losses += 1;
        winner = selectedTeam2.name;
      } else if (usTotalScore >= 200) {
        selectedTeam2.losses += 1;
        selectedTeam1.wins += 1;
        winner = selectedTeam1.name;
      }
      updateTeam(selectedTeam1)
      updateTeam(selectedTeam2)
      Alert.alert(
        `${winner} wins!`,
        "The game has ended, want to start a new Game?",
        [
          {
            text: "cancel",
            style: "cancel",
          },
          {
            text: "new game",
            onPress: onNewGame,
          },
        ]
      );
    }
  }
  const onNewGame = () => {
    database.cleanMatch(setScores)
    refreshTeams()
    setScore({ Them: "", Us: "" });
  };
  return (
    <View style={styles.home}>
      <View style={styles.basicSettings}>
        <Text style={styles.changeTeamText}>Change teams</Text>
        <TouchableOpacity onPress={onNewGame} style={styles.newGameBtn}>
          <Text style={styles.newGameText}>New</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.teams}>
        <TeamInput
          name="Them"
          team={selectedTeam2.name}
          value={score.Them}
          onValueChange={onScoreChange}
          color={colors.secondaryColor}
        />
        <TeamInput
          name="Us"
          team={selectedTeam1.name}
          value={score.Us}
          onValueChange={onScoreChange}
          color={colors.primaryColor}
        />
      </View>
      <TouchableOpacity onPress={onAddRound} style={styles.addBtn}>
        <Text style={styles.addTxt}>Add round</Text>
      </TouchableOpacity>
      <ScoreResult scores={scores} onRemoveRound={onRemoveRound}/>
    </View>
  );
};

export default Home;

const getStyles = (colors) => {
  return StyleSheet.create({
    home: {
      paddingTop: 55,
      paddingHorizontal: 40,
    },
    basicSettings: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    changeTeamText: {
      color: colors.darkTextColor,
      fontWeight: "bold",
      fontSize: 18,
    },
    newGameBtn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.secondaryColor,
      borderRadius: 10,
    },
    newGameText: {
      color: colors.lightTextColor,
      fontSize: 18,
      fontWeight: "bold",
    },
    teams: {
      paddingHorizontal: 15,
      marginTop: 40,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    addBtn: {
      width: "100%",
      paddingVertical: 15,
      backgroundColor: colors.primaryColor,
      opacity: 70,
      borderRadius: 10,
      marginTop: 30,
    },
    addTxt: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.lightTextColor,
      textAlign: "center",
    },
  });
};
