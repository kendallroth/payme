import React, { ReactElement } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import { EventsListScreen } from "./EventsListScreen";

const Stack = createNativeStackNavigator();

const EventsStack = (): ReactElement => {
  return (
    <Stack.Navigator initialRouteName="EventsList" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={EventsListScreen} name="EventsList" />
    </Stack.Navigator>
  );
};

export default EventsStack;

