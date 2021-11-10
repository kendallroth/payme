import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Components
import { HomeScreen } from "@screens/Home";
import { EventsListScreen } from "@screens/Events";
import { PeopleListScreen } from "@screens/People";

// Utilities
import { colors } from "@styles/theme";

export type BottomRouterParams = {
  Home: undefined;
  Events: undefined;
  People: undefined;
};

export type BottomRouterNavigation =
  NativeStackNavigationProp<BottomRouterParams>;

const Tabs = createMaterialBottomTabNavigator<BottomRouterParams>();

// TODO: Figure out why event/people tabs only render once!
// Maybe because I navigate to the router instead of the route (but it is handled by tabs...)???

const TabRouter = (): ReactElement => {
  const { t } = useTranslation(["screens"]);

  return (
    <Tabs.Navigator
      backBehavior="firstRoute"
      barStyle={{ backgroundColor: colors.primary }}
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
        component={EventsListScreen}
        name="Events"
        options={{
          tabBarIcon: "calendar",
          tabBarLabel: t("screens:events.title"),
        }}
      />
      <Tabs.Screen
        component={PeopleListScreen}
        name="People"
        options={{
          tabBarIcon: "account-multiple",
          tabBarLabel: t("screens:people.title"),
        }}
      />
      {/* <Tabs.Screen
        component={EventsRouter}
        name="Events"
        options={{ tabBarIcon: "calendar" }}
      />
      <Tabs.Screen
        component={PeopleRouter}
        name="People"
        options={{ tabBarIcon: "account-multiple" }}
      /> */}
    </Tabs.Navigator>
  );
};

export default TabRouter;
