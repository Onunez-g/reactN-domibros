import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

const ScoreResult = ({scores}) => {
  const {colors} = useTheme()
  const styles = getStyles(colors)
  return (
    <View style={{marginTop: 20}}>
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalText}>{scores.reduce((acc, x) => acc + x.Them, 0)}</Text>
        <Text style={styles.totalText}>{scores.reduce((acc, x) => acc + x.Us, 0)}</Text>
      </View>
      <ScrollView>
        {scores.map((x, i) => (
          <View key={i} style={styles.roundRow}>
            <Text style={styles.roundText}>R{i+1}</Text>
            <Text style={styles.roundThem}>{x.Them}</Text>
            <Text style={styles.roundUs}>{x.Us}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const getStyles = (colors) => {
  return StyleSheet.create({
    totalRow: {
      flexDirection: "row",
      backgroundColor: colors.darkTextColor,
      paddingVertical: 10,
      width: "100%",
      borderRadius: 5,
      justifyContent: "space-around",
      alignItems: "center"
    },
    totalText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.lightTextColor
    },
    roundRow: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      alignItems: "center",
      borderBottomColor: colors.primaryColor,
      borderBottomWidth: 1,
      borderStyle: "solid",
      paddingVertical: 10
    },
    roundText: {
      textAlign: "center",
      fontWeight: "bold",
      color: colors.darkTextColor
    },
    roundUs: {
      width: 20,
      textAlign: "right",
      color: colors.primaryColor
    },
    roundThem: {
      width: 20,
      textAlign: "right",
      color: colors.secondaryColor
    }
  })
}

export default ScoreResult