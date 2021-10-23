import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { getListStyles } from "./Styles";

const ScoreResult = ({ scores, onRemoveRound }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const listStyles = getListStyles(colors);
  return (
    <View style={{ marginTop: 20 }}>
      <View style={listStyles.headerRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalNumber}>
          {scores.reduce((acc, x) => acc + x.them, 0)}
        </Text>
        <Text style={styles.totalNumber}>
          {scores.reduce((acc, x) => acc + x.us, 0)}
        </Text>
      </View>
      <ScrollView style={styles.roundsBoard}>
        {scores.map((x, i) => (
          <TouchableOpacity onLongPress={() => onRemoveRound(x.id)} key={i}>
            <View style={listStyles.bodyRow}>
              <Text style={styles.roundText}>R{i + 1}</Text>
              <Text style={styles.roundThem}>{x.them}</Text>
              <Text style={styles.roundUs}>{x.us}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const getStyles = (colors) => {
  return StyleSheet.create({
    totalText: {
      width: 50,
      fontSize: 18,
      fontWeight: "bold",
      color: colors.lightTextColor,
    },
    roundText: {
      width: 50,
      textAlign: "center",
      fontWeight: "bold",
      color: colors.darkTextColor,
    },
    totalNumber: {
      width: 50,
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "right",
      color: colors.lightTextColor,
    },
    roundUs: {
      width: 50,
      textAlign: "right",
      color: colors.primaryColor,
    },
    roundThem: {
      width: 50,
      textAlign: "right",
      color: colors.secondaryColor,
    },
    roundsBoard: {
      height: "52%",
    },
  });
};

export default ScoreResult;
