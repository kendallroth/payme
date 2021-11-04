import React, { ReactElement } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import { AboutScreen } from "./AboutScreen";
import { SettingsScreen } from "./SettingsScreen";

const Stack = createNativeStackNavigator();

const SettingsStack = (): ReactElement => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={SettingsScreen} name="Settings" />
      <Stack.Screen component={AboutScreen} name="About" />
    </Stack.Navigator>
  );
};

export default SettingsStack;
