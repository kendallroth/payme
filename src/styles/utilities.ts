import { Platform, ViewStyle } from "react-native";

// Utilities
import { sharedColors } from "./theme";

/**
 * Get common shadow styles (for iOS)
 *
 * @param   depth - Shadow depth
 * @returns Shadow styles
 */
export const getShadowStyles = (depth = 2): Partial<ViewStyle> => {
  if (Platform.OS !== "ios") return {};

  return {
    shadowColor: sharedColors.black,
    shadowOffset: { width: 0, height: depth },
    shadowOpacity: 0.2,
    shadowRadius: depth,
  };
};
