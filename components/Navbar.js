import React, { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useKeyboardVisibility } from "../hooks/KeyboardHook";

const NavBar = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const isKeyboardVisible = useKeyboardVisibility()
  return (
    !isKeyboardVisible && (
      <View style={styles.navbarContainer}>
        <Ionicons name="home-outline" size={36} color={colors.primaryColor} />
        <MaterialIcons
          name="people-outline"
          size={36}
          color={colors.primaryColor}
        />
        <Ionicons
          name="settings-outline"
          size={36}
          color={colors.primaryColor}
        />
      </View>
    )
  );
};

export default NavBar;

const getStyles = (colors) => {
  return StyleSheet.create({
    navbarContainer: {
      height: 65,
      flexDirection: "row",
      width: "100%",
      marginTop: "auto",
      borderTopColor: colors.primaryColor,
      borderTopWidth: 1,
      borderStyle: "solid",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  });
};
