# PayMe

Simple app that tracks who has paid for an event.

- Track small payments for an event
- Use common people lists for an event

## Features

- Overview (_list of oustanding events_)*
- Events (_list of events for payment_)
- People (_lists of common groups of payees_)

## Development

```sh
# Start Metro bundler (with hot reload)
npm run start

# Start Metro bundler after clearing build cache
npm run start -- --clear
```

## UI

### Components

Components are based on the [React Native Paper](https://callstack.github.io/react-native-paper/) library, an interpretation of the Material Design guidelines for React Native.

### Images

Vector images are taken from [UnDraw](https://undraw.co/illustrations) and edited in Affinity Photo to remove the background.

### App Icons

Icons were generated with the [Build Icon](https://buildicon.netlify.app/?color=white&emoji=palms_up_together) tool.

## Notes

### Resources

- [i18n Localization](https://brainsandbeards.com/blog/i18n-in-react-native-apps)

#### Linting

Since the upgrade to Expo SDK 43, `@react-native-community/eslint-config` does not properly install all dependencies (Mac only). After spending too much time trying to debug the issue, I have installed all its dependencies manually to get around the issue.

#### `react-native-paper`

Version `4.10.0` of `react-native-paper` has issues with TypeScript for any component based upon the `Text` component. Downgrading to `3.9.2` resolves the issues without missing many additional features.

### `country-flag-icons`

The `country-flag-icons` package currently does not include TypeScript definition files, and the `@types/country-flag-icons` package is missing the React definition files. This causes some compilation errors that are currently ignored with `@ts-ignore`.

## TODOs

- Explore localized date formatting with ([`i18n Formatting`](https://www.i18next.com/translation-function/formatting)) (alternative at [Brains and Beards](https://brainsandbeards.com/blog/i18n-in-react-native-apps#formatting))
- Change Redux Persist key depending on app environment (to use different store with published Expo/Google apps, etc)
