import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Components
import { HomeScreen } from "@screens/Home";
import { EventsListScreen } from "@screens/Events";
import { PeopleListScreen } from "@screens/People";

// Utilities
import { colors } from "@styles/theme";

const Tabs = createMaterialBottomTabNavigator();

// TODO: Figure out why event/people tabs only render once!
// Maybe because I navigate to the router instead of the route (but it is handled by tabs...)???

const TabRouter = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <Tabs.Navigator
      backBehavior="firstRoute"
      barStyle={{ backgroundColor: colors.primary }}
      shifting={true}
    >
      <Tabs.Screen
        component={HomeScreen}
        name={t("screens.home.title")}
        options={{ tabBarIcon: "home" }}
      />
      <Tabs.Screen
        component={EventsListScreen}
        name={t("screens.events.title")}
        options={{ tabBarIcon: "calendar" }}
      />
      <Tabs.Screen
        component={PeopleListScreen}
        name={t("screens.people.title")}
        options={{ tabBarIcon: "account-multiple" }}
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
