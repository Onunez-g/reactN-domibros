import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Home from "../components/Home";
import Teams from "../components/Teams";
import Settings from "../components/Settings";
import { useTheme } from "../contexts/ThemeContext";
const Tab = createBottomTabNavigator();

const MainRoutes = () => {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: colors.backgroundColor,
        }}
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarActiveTintColor: colors.primaryColor,
          tabBarStyle: {
            backgroundColor: colors.backgroundColor,
            elevation: 0,
            borderTopColor: colors.primaryColor,
            borderTopWidth: 1,
            borderStyle: "solid",
            height: 60,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return <Ionicons name="home-outline" size={size} color={color} />;
            } else if (route.name === "Teams") {
              return (
                <MaterialIcons
                  name="people-outline"
                  size={size}
                  color={color}
                />
              );
            } else {
              return (
                <Ionicons name="settings-outline" size={size} color={color} />
              );
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Teams" component={Teams} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainRoutes;
