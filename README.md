# PayMe

Simple app that tracks who has paid for an event.

- Track small payments for an event
- Use common people lists for an event

> [Expo - `testing`](https://expo.dev/@kendallroth/payme?release-channel=testing)

## Features

- Overview (_list of oustanding events_)*
- Events (_list of events for payment_)
- People (_lists of common groups of payees_)

## TODOs

- Handle removing deleted person from event attendance

## Development

```sh
# Start Metro bundler (with hot reload)
npm run start

# Start Metro bundler after clearing build cache
npm run start -- --clear
```

## Releases

Releases can be deployed through Expo Go (for testing) or the Expo managed build system (for release). The app version is taken from the `package.json`, which should be updated before every major deployment. App environment configuration is possible with the `expo-updates` package, which exposes the value of the `releaseChannel` used when building the app.

> **NOTE:** Remember to update the `version` in `package.json` before each deployment!

> **NOTE:** Remember to properly set the **release channel** for each deployment!

### Testing Releases

Testing releases are released through Expo Go, which allows

```sh
expo publish --release-channel <ENVIRONMENT>
```

### Production Releases

_Coming Soon_

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


#### `@react-navigation/material-bottom-tabs`

The `@react-navigation/material-bottom-tabs` introduced an Android issue in Expo SDK 43 when nesting a stack navigator inside a Material bottom tab navigator. After the first time the nested stack navigator is accessed, it will no longer be accessible (apparently clipped out entirely)? This can be resolved by surrounding the nested `Stack` navigator with a non-collapsable `View` ([source](https://github.com/software-mansion/react-native-screens/issues/1197#issuecomment-993682256)). However, this is a workaround that has not been fixed yet!

## TODOs

- Fix validation bug when trying to "save" multiple added people with an empty text field (since validation still runs)!
- Explore localized date formatting with ([`i18n Formatting`](https://www.i18next.com/translation-function/formatting)) (alternative at [Brains and Beards](https://brainsandbeards.com/blog/i18n-in-react-native-apps#formatting))
- Improve theme colors (especially dark theme)
