import { RefObject, useCallback, useRef, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Types
import { ScrollEvent } from "@typings/app.types";

interface IScrollProps {
  /** Whether to scroll to top when screen is focused */
  scrollToTopOnFocus?: boolean;
  /** Threshold for scrolling "near" detection */
  threshold?: number;
}

interface IScrollView {
  /** Scroll direction */
  direction: "down" | "up";
  /** Whether scrolling is near top (given a threshold) */
  nearTop: boolean;
  /** Whether scrolling is near bottom (given a threshold) */
  nearBottom: boolean;
  /** Offset from bottom (can be negative with overscroll) */
  offsetBottom: number;
  /** Offset from top (can be negative with overscroll) */
  offsetTop: number;
}

interface IScrollViewScrolling {
  /** Scroll view stats */
  scroll: IScrollView;
  /** Ref for scrollable view */
  scrollViewRef: RefObject<FlatList>;
  /** Scroll event handler (pass to ScrollView) */
  onListScroll: (event: ScrollEvent) => void;
}

/**
 * Track scroll progress in a ScrollView
 *
 * @param   args - Scroll arguments
 * @returns Scroll progress and scroll callback
 */
const useScrollViewScrolling = (args?: IScrollProps): IScrollViewScrolling => {
  const { scrollToTopOnFocus = true, threshold = 0 } = args ?? {};

  const [scroll, setScroll] = useState<IScrollView>({
    direction: "down",
    nearBottom: false,
    nearTop: true,
    offsetBottom: 0,
    offsetTop: 0,
  });
  const [scrollY, setScrollY] = useState(0);
  const scrollViewRef = useRef<FlatList>(null);

  useFocusEffect(
    // Reset scroll view position when leaving page (likely expected)?
    //   This is necessary to show FAB on refocus if hidden previously.
    useCallback(() => {
      return (): void => {
        if (scrollToTopOnFocus) {
          scrollViewRef.current?.scrollToOffset({ animated: false, offset: 0 });
        }
      };
    }, [scrollToTopOnFocus]),
  );

  const onListScroll = (event: ScrollEvent): void => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    // TODO: Determine if height being less than thresholds or screen height will matter?

    const newY = contentOffset.y;
    const endY = contentSize.height - layoutMeasurement.height;
    setScrollY(newY);

    const movingDown = newY > scrollY;
    const nearTop = newY < threshold;
    const nearBottom = endY - newY < threshold;

    setScroll({
      direction: movingDown ? "down" : "up",
      nearTop,
      nearBottom,
      offsetBottom: endY - newY,
      offsetTop: newY,
    });
  };

  return {
    scroll,
    scrollViewRef,
    onListScroll,
  };
};

export { useScrollViewScrolling };
