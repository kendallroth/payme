import React, { ReactElement } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

// Components
import { AboutScreen } from "./AboutScreen";
import { BehavioursScreen } from "./BehavioursScreen";
import { DeveloperScreen } from "./DeveloperScreen";
import { SettingsScreen } from "./SettingsScreen";
import { ReportBugScreen } from "./ReportBug";

export type SettingsRouterParams = {
  About: undefined;
  Behaviours: undefined;
  Developer: undefined;
  ReportBug: undefined;
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
      <Stack.Screen component={BehavioursScreen} name="Behaviours" />
      <Stack.Screen component={DeveloperScreen} name="Developer" />
      <Stack.Screen component={ReportBugScreen} name="ReportBug" />
    </Stack.Navigator>
  );
};

export default SettingsStack;
