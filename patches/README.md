# Patches

`patch-package` allows modifying installed NPM packages directly in `node_modules`, then generating a patch to apply to future installations of that package. This enables modifying package behaviour or fixing bugs without having to wait for upstream changes. PayMe uses several packages that require patching in some form, whether for bugs or changing functionality.

### React Native Gesture Handler

`react-native-gesture-handler` does not support animated styles on the `Swipeable` component, which is required to animate element opacity when swiping an item. The patch simply modifies the TypeScript definitions and is only necessary in development.

### React Native Paper

`react-native-paper` provides the `BottomNavigation` component utilized by the app's bottom tab navigation (wrapped by React Navigation). The tab navigation component utilized lazy loading to only load tabs when mounted for the first time. However, this caused issues with navigation directly to an event before the event list page had been mounted. More specifically, it caused issues with the event tab router when going back, as the event list could sometimes be added to the stack _after_ the event details page. The patch prevents lazy loading (not expensive) to ensure the event list screen is always mounted first. This has the added benefit of enabling better FAB transitions (previously did not animate on first mount).

Additionally, the `CheckBox.Item` component did not properly disable the row touch interaction when disabled. The patch disables the touch interaction entirely (when disabled) and styles the checkbox item label accordingly.
