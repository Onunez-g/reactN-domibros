import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import Home from "./components/Home";
import { StyleSheet, View } from "react-native";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import NavBar from "./components/Navbar";
import * as SplashScreen from "expo-splash-screen";
import useDatabase from "./hooks/DatabaseHook";
import { TeamsProvider } from "./contexts/TeamsContext";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const isDBLoadingComplete = useDatabase();
  const teams = [
    {id: 1,name: "Us", wins: 0, losses: 0},
    {id: 2,name: "Them", wins: 0, losses: 0}
  ]
  if (isDBLoadingComplete) {
    SplashScreen.hideAsync();
    return (
      <AppearanceProvider>
        <ThemeProvider>
          <TeamsProvider teams={teams}>
            <View style={styles.container}>
              <Home />
              <NavBar />
            </View>
          </TeamsProvider>
        </ThemeProvider>
      </AppearanceProvider>
    );
  } else {
    return null;
  }
}

const getStyles = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backGroundColor,
    },
  });
};
