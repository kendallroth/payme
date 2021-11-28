import React, { ReactElement } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import { EventListScreen } from "./EventListScreen";

const Stack = createNativeStackNavigator();

const EventsStack = (): ReactElement => {
  return (
    <Stack.Navigator
      initialRouteName="EventList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={EventListScreen} name="EventList" />
    </Stack.Navigator>
  );
};

export default EventsStack;
