import React, { ReactElement } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

// Components
import { EventDetailsScreen } from "./EventDetailsScreen";
import { EventListScreen } from "./EventListScreen";
import { RouteProp } from "@react-navigation/native";

export type EventsRouterParams = {
  EventDetails: {
    /** Event ID */
    eventId: string;
  };
  EventList: undefined;
};

export type EventDetailsScreenProps = RouteProp<
  EventsRouterParams,
  "EventDetails"
>;

export type EventsRouterNavigation =
  NativeStackNavigationProp<EventsRouterParams>;

const Stack = createNativeStackNavigator<EventsRouterParams>();

const EventsStack = (): ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName="EventList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={EventListScreen} name="EventList" />
      <Stack.Screen component={EventDetailsScreen} name="EventDetails" />
    </Stack.Navigator>
  );
};

export default EventsStack;
