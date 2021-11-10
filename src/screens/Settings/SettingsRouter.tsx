import React, { ReactElement } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

// Components
import { AboutScreen } from "./AboutScreen";
import { SettingsScreen } from "./SettingsScreen";

export type SettingsRouterParams = {
  About: undefined;
  Settings: undefined;
};

export type SettingsRouterNavigation =
  NativeStackNavigationProp<SettingsRouterParams>;

const Stack = createNativeStackNavigator<SettingsRouterParams>();

const SettingsStack = (): ReactElement => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={SettingsScreen} name="Settings" />
      <Stack.Screen component={AboutScreen} name="About" />
    </Stack.Navigator>
  );
};

export default SettingsStack;
