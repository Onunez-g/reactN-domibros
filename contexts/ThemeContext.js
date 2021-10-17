import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "../styles/colors";

export const ThemeContext = React.createContext({
  isDark: false,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider = (props) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark")

  useEffect(() => {
    setIsDark(colorScheme === "dark")
  }, [colorScheme])

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme) => {
      console.log(scheme, scheme === "dark")
      setIsDark(scheme === "dark")
    }
  }
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext);