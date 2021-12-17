import React, { ReactElement, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

// Components
import { EventDetailsScreen } from "./EventDetailsScreen";
import { EventListScreen } from "./EventListScreen";
import { BottomRouterNavigation } from "src/TabRouter";

// Utilities
import { useAppSelector } from "@hooks";
import { selectBehaviours } from "@store/slices/settings";

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
  const appBehaviours = useAppSelector(selectBehaviours);
  const tabNavigation = useNavigation<BottomRouterNavigation>();
  const stackNavigation = useNavigation<EventsRouterNavigation>();

  useEffect(() => {
    const unsubscribe = tabNavigation.addListener("tabPress", () => {
      if (appBehaviours?.tabsResetHistory) {
        // Directly returning to Events tab should optionally reset state (less confusion)
        // TODO: Maybe find a way to do this proactively, so that the tab doesn't focus
        //         mid-animation (ie. do when leaving tab)?
        stackNavigation.navigate("EventList");
      }
    });

    return unsubscribe;
  }, [appBehaviours, stackNavigation, tabNavigation]);

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
