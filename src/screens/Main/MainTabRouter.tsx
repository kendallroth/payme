import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Components
import { HomeScreen } from "@screens/Main/HomeScreen";

// Utilities
import { colors } from "@styles/theme";

const Tabs = createMaterialBottomTabNavigator();

const MainTabRouter = (): React.ReactElement => {
  return (
    <Tabs.Navigator
      backBehavior="firstRoute"
      barStyle={{ backgroundColor: colors.primary }}
      labeled={false}
    >
      <Tabs.Screen
        component={HomeScreen}
        name="Home"
        options={{ tabBarIcon: "home" }}
      />
      <Tabs.Screen
        component={HomeScreen}
        name="Events"
        options={{ tabBarIcon: "calendar", title: "Events" }}
      />
      <Tabs.Screen
        component={HomeScreen}
        name="People"
        options={{ tabBarIcon: "account-multiple" }}
      />
    </Tabs.Navigator>
  );
};

export default MainTabRouter;
