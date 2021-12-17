import React, { ReactElement, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

// Components
import { EventDetailsScreen } from "./EventDetailsScreen";
import { EventListScreen } from "./EventListScreen";
import { RouteProp } from "@react-navigation/native";
import { BottomRouterNavigation } from "src/TabRouter";

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
  const tabNavigation = useNavigation<BottomRouterNavigation>();
  const stackNavigation = useNavigation<EventsRouterNavigation>();

  useEffect(() => {
    const unsubscribe = tabNavigation.addListener("tabPress", () => {
      // Directly returning to Events tab should reset state (less confusion)
      stackNavigation.navigate("EventList");
    });

    return unsubscribe;
  }, [stackNavigation, tabNavigation]);

  // NOTE: Extra non-collapsable view required to fix issue where navigating to tab
  //         after the first time would not display anything (apparently clipepd out?)!
  // Source: https://github.com/software-mansion/react-native-screens/issues/1197#issuecomment-993682256
  return (
    <View collapsable={false} style={styles.stackFix}>
      <Stack.Navigator
        initialRouteName="EventList"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={EventListScreen} name="EventList" />
        <Stack.Screen component={EventDetailsScreen} name="EventDetails" />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  stackFix: {
    flex: 1,
  },
});

export default EventsStack;
