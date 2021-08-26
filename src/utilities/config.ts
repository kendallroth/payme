// Utilities
import { version } from "../../package.json";

interface IAppConfigLinks {
  /** App developer email */
  developerEmail: string;
  /** App developer URL */
  developerUrl: string;
  /** GitLab project URL */
  gitlabUrl: string;
}

interface IAppConfig {
  /** App links */
  links: IAppConfigLinks;
  /** App version */
  version: string;
}

const config: IAppConfig = {
  links: {
    developerEmail: "kendall@kendallroth.ca",
    developerUrl: "https://www.kendallroth.ca",
    gitlabUrl: "https://gitlab.com/kendallroth/payme",
  },
  version,
};

export default config;
