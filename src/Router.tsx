import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Components
import MainScreen from "@screens/MainScreen";
import AboutScreen from "@screens/Settings/AboutScreen";

// Utilities
import { colors } from "@styles/theme";

const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    text: colors.primary,
  },
};

const Router = (): React.ReactElement => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          // NOTE: Default transition can cause flickering if header color is different than page!
          ...TransitionPresets.DefaultTransition,
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
