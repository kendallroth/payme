import Constants from "expo-constants";

// Utilities
import { version } from "../../package.json";

/** App configuration links */
interface IAppConfigLinks {
  /** App developer email */
  developerEmail: string;
  /** App developer URL */
  developerUrl: string;
  /** GitLab project URL */
  gitlabUrl: string;
}

/** App configuration */
interface IAppConfig {
  /** Deployment environment (release channel) */
  environment: string;
  /** App links */
  links: IAppConfigLinks;
  /** App version */
  version: string;
}

const config: IAppConfig = {
  // NOTE: Release channel is not present in development builds!
  environment: Constants.manifest?.releaseChannel ?? "default",
  links: {
    developerEmail: "kendall@kendallroth.ca",
    developerUrl: "https://www.kendallroth.ca",
    gitlabUrl: "https://gitlab.com/kendallroth/payme",
  },
  version,
};

export default config;
