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

### Linting

`@react-native-community/eslint-config` does not work on Mac for some reason (works on Ubuntu) since the recent upgrade to Expo SDK 43. After spending too much time trying to debug the issue, I have replaced the package with its dependencies until it can be resolved.
