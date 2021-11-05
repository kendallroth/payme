import React, { ReactElement } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import { PeopleListScreen } from "./PeopleListScreen";

const Stack = createNativeStackNavigator();

const PeopleStack = (): ReactElement => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={PeopleListScreen} name="PeopleList" />
    </Stack.Navigator>
  );
};

export default PeopleStack;
