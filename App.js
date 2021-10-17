import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import Home from "./components/Home";
import { StyleSheet, View } from "react-native";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import NavBar from "./components/Navbar";

export default function App() {
  const {colors} = useTheme();
  const styles = getStyles(colors)
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <View style={styles.container}>
          <Home/>
          <NavBar/>
        </View>
      </ThemeProvider>
    </AppearanceProvider>
  );
}

const getStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backGroundColor,
    }
  });
};