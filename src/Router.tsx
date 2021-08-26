import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import MainScreen from "@screens/MainScreen";
import AboutScreen from "@screens/Settings/AboutScreen";

// Utilities
import { colors } from "@styles/theme";

const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();

const Router = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
