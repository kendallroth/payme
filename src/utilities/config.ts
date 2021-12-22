import * as Application from "expo-application";
import Constants from "expo-constants";

// Utilities
import { version as packageVersion } from "../../package.json";

const runningInExpo = Constants.appOwnership === "expo";

const version = !runningInExpo
  ? Application.nativeApplicationVersion
  : packageVersion;
const versionBuild = !runningInExpo
  ? Application.nativeBuildVersion
  : packageVersion;

/** App configuration links */
interface IAppConfigLinks {
  /** App developer email */
  developerEmail: string;
  /** App developer URL */
  developerUrl: string;
  /** Repository URL */
  repositoryUrl: string;
}

/** App configuration */
interface IAppConfig {
  /** Deployment environment (release channel) */
  environment: string;
  /** App links */
  links: IAppConfigLinks;
  /** App version name (semantic) */
  version: string;
  /** App version build number */
  versionBuild: string;
}

const config: IAppConfig = {
  // NOTE: Release channel is not present in development builds!
  environment: Constants.manifest?.releaseChannel ?? "default",
  links: {
    developerEmail: "kendall@kendallroth.ca",
    developerUrl: "https://www.kendallroth.ca",
    repositoryUrl: "https://github.com/kendallroth/payme",
  },
  version: version ?? packageVersion,
  versionBuild: versionBuild ?? packageVersion,
};

export default config;
