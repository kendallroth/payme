import { RefObject, useState } from "react";
import { FlatList } from "react-native";

// Types
import { ScrollEvent } from "@typings/app.types";

import { useScrollViewScrolling } from "./useScrollViewScrolling";

interface IScrollingFab {
  /** Whether FAB should be visible */
  fabVisible: boolean;
  /** Ref for scrollable view */
  scrollViewRef: RefObject<FlatList>;
  /** Scroll event handler (pass to ScrollView) */
  onListScroll: (event: ScrollEvent) => void;
}

/**
 * Hide FAB whle scrolling down in a ScrollView
 *
 * @returns FAB visibility and scroll callback
 */
const useScrollingFab = (): IScrollingFab => {
  const [fabVisible, setFabVisible] = useState(true);
  const { scroll, scrollViewRef, onListScroll } = useScrollViewScrolling({
    threshold: 50,
  });

  // NOTE: Previously tried reshowing FAB when parent navigator was focused,
  //         but the following code would then run and hide it immediately.
  //       Instead, handle resetting scroll index when leaving pages with scroll views...

  const movingDown = scroll.direction === "down";

  if (movingDown && fabVisible && !scroll.nearTop) {
    setFabVisible(false);
  } else if (!movingDown && !fabVisible && !scroll.nearBottom) {
    setFabVisible(true);
  }

  return {
    fabVisible,
    scrollViewRef,
    onListScroll,
  };
};

export { useScrollingFab };
