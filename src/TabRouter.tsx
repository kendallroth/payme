import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationProp,
} from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";

// Components
import { HomeScreen } from "@screens/Home";
import { EventsRouter } from "@screens/Events";
import { PeopleListScreen } from "@screens/People";

export type BottomRouterParams = {
  Home: undefined;
  Events: undefined;
  People: undefined;
};

export type BottomRouterNavigation =
  MaterialBottomTabNavigationProp<BottomRouterParams>;

const Tabs = createMaterialBottomTabNavigator<BottomRouterParams>();

const TabRouter = (): ReactElement => {
  const { t } = useTranslation(["screens"]);

  const { colors, dark } = useTheme();

  return (
    <Tabs.Navigator
      backBehavior="initialRoute"
      barStyle={{ backgroundColor: dark ? colors.background : colors.primary }}
      shifting={true}
    >
      <Tabs.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarIcon: "home",
          tabBarLabel: t("screens:home.title"),
        }}
      />
      <Tabs.Screen
        component={EventsRouter}
        name="Events"
        options={{
          tabBarIcon: "calendar",
          tabBarLabel: t("screens:eventList.title"),
        }}
      />
      <Tabs.Screen
        component={PeopleListScreen}
        name="People"
        options={{
          tabBarIcon: "account-multiple",
          tabBarLabel: t("screens:peopleList.title"),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabRouter;
