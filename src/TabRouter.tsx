import React, { ReactElement } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Components
import { HomeScreen } from "@screens/Home";
import { EventsListScreen, EventsRouter } from "@screens/Events";
import { PeopleListScreen, PeopleRouter } from "@screens/People";

// Utilities
import { colors } from "@styles/theme";

const Tabs = createMaterialBottomTabNavigator();

// TODO: Figure out why event/people tabs only render once!
// Maybe because I navigate to the router instead of the route (but it is handled by tabs...)???

const TabRouter = (): ReactElement => {
  return (
    <Tabs.Navigator
      backBehavior="firstRoute"
      barStyle={{ backgroundColor: colors.primary }}
      shifting={true}
    >
      <Tabs.Screen
        component={HomeScreen}
        name="Home"
        options={{ tabBarIcon: "home" }}
      />
      <Tabs.Screen
        component={EventsListScreen}
        name="Events"
        options={{ tabBarIcon: "calendar" }}
      />
      <Tabs.Screen
        component={PeopleListScreen}
        name="People"
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
