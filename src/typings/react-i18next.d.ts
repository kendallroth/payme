import "react-i18next";

// Utilities
import { resources } from "../localization/config";

/*declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof resources["en"];
  }
}*/

declare module "react-i18next" {
  type DefaultResources = typeof resources["en"];
  interface Resources extends DefaultResources {}
}
