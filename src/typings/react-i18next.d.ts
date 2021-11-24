import "react-i18next";

// Utilities
import { defaultNamespace, resources } from "../localization/config";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNamespace;
    resources: typeof resources["en"];
  }
}
