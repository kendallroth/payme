# PayMe

![](https://github.com/kendallroth/payme/workflows/Code%20Quality/badge.svg)
![](https://img.shields.io/github/v/release/kendallroth/payme?include_prereleases)
![](https://img.shields.io/badge/android--lightgreen?logo=android&logoColor=lightgreen)
![](https://img.shields.io/badge/apple--lightgrey?logo=apple&logoColor=offwite)

Simple app that tracks who has paid for an event.

> [Expo - `release`](https://expo.dev/@kendallroth/payme)<br />
> [Expo - `testing`](https://expo.dev/@kendallroth/payme?release-channel=testing)

## Features

- Overview (_list of oustanding events_)
- Events (_list of events for payment_)
- People (_lists of recurring payees_)

## Contributing

Thanks to [all those](CONTRIBUTORS.md) who have contributed to this project so far!

## Development

```sh
# Start Metro bundler (with hot reload)
npm run start

# Start Metro bundler after clearing build cache
npm run start -- --clear
```

### Windows WSL2

Developing in WSL2 requires some [additional configuration](./docs/expo-with-wsl2.md) and different start up process.

## Releases

Releases can be deployed through Expo Go (for testing) or the Expo managed build system (for release). The app version is taken from the `package.json`, which should be updated before every major deployment. App environment configuration is possible with the `expo-updates` package, which exposes the value of the `releaseChannel` used when building the app.

> **NOTE:** Remember to update the `version` in `package.json` before each release/deployment! This is especially important for App Store releases

### Testing Releases

Testing releases are released through Expo Go, which allows releasing for several environments. Specific release channels can be tested by visiting the release channel link, stored at the top of this file.

```sh
# Publish to a default environment
expo publish

# Publish to a specific environment
expo publish --release-channel <ENVIRONMENT>
```

> **NOTE:** Remember to properly set the **release channel** for each deployment (if needed)!

### Production Releases

Production builds and releases are handled with [EAS Build](https://docs.expo.dev/build/introduction/) and [EAS Submit](https://docs.expo.dev/submit/introduction/).

> **NOTE:** Remember to properly update the `version` (`package.json`) and increment the `androidVersionCode`/`iosBuildNumber` (`app.config.ts`) before each release intended for submission!

#### Production Builds

Production builds utilize the [EAS CLI](https://github.com/expo/eas-cli) and [EAS Build](https://docs.expo.dev/build/introduction/) to automatically upload and build native artifacts for later submission. The EAS CLI requires some minor input for both Android and iOS platforms (credentials, paths, etc), which could be abstracted to `eas.json` but is not for security. Once the build(s) have been started, links are provided to view the build progress. An artifact download link will be generated once the build has completed; however, EAS Submit can automatically pull builds from EAS Build.

```sh
# Build for all platforms
eas build

# Build for a specific platform
eas build --platform android
eas build --platform ios
```

By default, these artifacts are intended for submission and cannot be used for testing (due to output format). EAS Build has documention for [testing APKs](https://docs.expo.dev/build-reference/apk/) as well as building for [ios Simulators](https://docs.expo.dev/build-reference/simulators/).

#### Production Submission

Production builds utilize the [EAS CLI](https://github.com/expo/eas-cli) and [EAS Submit](https://docs.expo.dev/submit/introduction/) to automatically submit builds to the app stores. The EAS CLI requires some minor input for both Android and iOS platforms (bundle, credentials, etc), similar to the build workflow. Submission is typically a very fast process, and once the apps have been submitted they may be included in app store releases.

```sh
# Submit for a specific platform
eas submit --platform android
eas submit --platform ios
```

#### Production Releases

Once a production app has been built and submitted, a release can be created in the appropriate app store.

##### Google Play Store

Google Play submissions are automatically released to the "Internal" track, which does not require submission approval before testing. After internal testing, the app can be promoted to either a Closed/Open test, or directly to production, after it has been approved. Release notes and details can be specified each time a release is promoted, although typically they will be changed only when promoting out of Internal testing. Promoting an app to the production track will officially release the new version to users.

##### Apple App Store

Apple submissions are not automatically released to an internal testing track, but instead must have a new release created from the App Connect dashboard. The new release will inherit information from previous releases, and needs to have its version updated, release notes added, and a bundle selected. The release can then be submitted to TestFlight, allowing internal testing, before submitting for production review.

#### Production Updates

Production updates are currently only available with the `expo-updates` package (not configured in this project), but there will soon be public support for [EAS Update](https://docs.expo.dev/eas-update/introduction/).

**_Coming Soon!_**

## UI

### Components

Components are based on the [React Native Paper](https://callstack.github.io/react-native-paper/) library, an interpretation of the Material Design guidelines for React Native.

### Images

Vector images are taken from [UnDraw](https://undraw.co/illustrations) and edited in Affinity Photo to remove the background.

### App Icons

Icons were generated with the [Build Icon](https://buildicon.netlify.app/?color=white&emoji=palms_up_together) tool.

## Notes

### Resources

- [Environment Configuration](https://docs.expo.dev/distribution/release-channels/#using-release-channels-for-environment-variable-configuration)
- [i18n Localization](https://brainsandbeards.com/blog/i18n-in-react-native-apps)
- [React Navigation TypeScript](https://reactnavigation.org/docs/typescript)

#### Linting

Since the upgrade to Expo SDK 43, `@react-native-community/eslint-config` does not properly install all dependencies (Mac only). After spending too much time trying to debug the issue, I have installed all its dependencies manually to get around the issue.

#### `react-native-paper`

Version `4.10.0` of `react-native-paper` has issues with TypeScript for any component based upon the `Text` component. Downgrading to `3.9.2` resolves the issues without missing many additional features.

By default, the `BottomNavigation` component mounts tabs lazily. However, this caused several issues that resulted in disabling (via patch) the lazy mounting. The biggest issue was that navigating to "EventDetails" (from Home) _before_ mounting the "EventsTab" would mean the "EventList" screen was not included in history, resulting in strange back behaviour.

#### `@react-navigation/material-bottom-tabs`

The `@react-navigation/material-bottom-tabs` introduced an Android issue in Expo SDK 43 when nesting a stack navigator inside a Material bottom tab navigator. After the first time the nested stack navigator is accessed, it will no longer be accessible (apparently clipped out entirely)? This can be resolved by surrounding the nested `Stack` navigator with a non-collapsable `View` ([source](https://github.com/software-mansion/react-native-screens/issues/1197#issuecomment-993682256)). However, this is a workaround that has not been fixed yet!

## TODOs

- Explore localized date formatting with ([`i18n Formatting`](https://www.i18next.com/translation-function/formatting)) (alternative at [Brains and Beards](https://brainsandbeards.com/blog/i18n-in-react-native-apps#formatting))
- Improve theme colors (especially dark theme)
