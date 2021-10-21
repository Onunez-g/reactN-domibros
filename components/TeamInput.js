import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

const TeamInput = (props) => {
  const {colors} = useTheme()
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "column",
      justifyContent: "center",
      width: 100,
    },
    teamText: {
      color: props.color,
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center"
    },
    teamInput: {
      marginTop: 20,
      backgroundColor: "#FAFAFA",
      padding: 15,
      borderRadius: 10,
      color: colors.darkTextColor,
      width: 120,
      elevation: 2,
      textAlign: "right",
      fontSize: 18
    }
  });
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.teamText}>{props.team || props.name}</Text>
      <TextInput
        style={styles.teamInput}
        placeholder="0"
        value={props.value}
        onChangeText={(text) => props.onValueChange(props.name, text)}
        keyboardType="number-pad"
      />
    </View>
  );
};

export default TeamInput;
