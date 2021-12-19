import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

/** Left or right direction */
export type LeftRight = "left" | "right";

/** Material community icons */
export type MaterialCommunityIcons =
  typeof import("react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json");

/** ScrollView scroll event */
export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;
