import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { StyleSheet, View } from "react-native";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import * as SplashScreen from "expo-splash-screen";
import useDatabase from "./hooks/DatabaseHook";
import { TeamsProvider } from "./contexts/TeamsContext";
import MainRoutes from "./Router/Routes";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const isDBLoadingComplete = useDatabase();
  const teams = [
    { id: 1, name: "Us", wins: 0, losses: 0 },
    { id: 2, name: "Them", wins: 0, losses: 0 },
  ];
  if (isDBLoadingComplete) {
    SplashScreen.hideAsync();
    return (
      <AppearanceProvider>
        <ThemeProvider>
          <TeamsProvider teams={teams}>
            <MainRoutes />
          </TeamsProvider>
        </ThemeProvider>
      </AppearanceProvider>
    );
  } else {
    return null;
  }
}
