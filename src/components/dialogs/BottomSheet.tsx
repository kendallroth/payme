import React, {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useState,
} from "react";
import {
  // Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Modal from "react-native-modal";
import { Text, useTheme } from "react-native-paper";

export type BottomSheetProps = {
  /** Modal contents */
  children: ReactElement | ReactElement[];
  /**
   * Whether modal can be closed
   *
   * NOTE: Not implemented yet
   */
  closable?: boolean;
  /** Whether content should be inset horizontally (20px) */
  inset?: boolean;
  /** Modal content style */
  style?: StyleProp<ViewStyle>;
  /** Modal title */
  title?: string;
  /** Close callback */
  onClose?: () => void;
};

export type BottomSheetRef = {
  /** Close the modal */
  close: () => void;
  /** Open the modal */
  open: () => void;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (props: BottomSheetProps, ref) => {
    const { children, inset = true, style = {}, title, onClose = null } = props;

    const [isOpen, setIsOpen] = useState(false);
    const { colors, dark } = useTheme();

    useImperativeHandle(ref, (): BottomSheetRef => {
      return {
        close,
        open,
      };
    });

    const themeStyles = {
      backdropColor: dark ? "#444444aa" : "#44444466",
      backgroundColor: colors.background,
    };

    /**
     * Close the modal (from external source)
     */
    const close = (): void => {
      if (!isOpen) return;
      setIsOpen(false);

      // Notify parent component that modal has closed (only for internal closures)!
      onClose && onClose();
    };

    /**
     * Open the modal
     */
    const open = (): void => {
      if (isOpen) return;
      setIsOpen(true);
    };

    return (
      <Modal
        backdropColor={themeStyles.backdropColor}
        backdropOpacity={0.8}
        // NOTE: Necessary to fix backdrop flicker bug when closing. If flickering
        //         persists try 'hideModalContentWhileAnimating' as well.
        backdropTransitionOutTiming={0}
        isVisible={isOpen}
        style={[styles.sheetModal]}
        onBackdropPress={close}
        onBackButtonPress={close}
      >
        <View
          style={[
            styles.sheetContent,
            themeStyles,
            inset ? styles.sheetInset : undefined,
            style,
          ]}
        >
          {Boolean(title) && (
            <Text
              style={[styles.sheetTitle, inset ? undefined : styles.sheetInset]}
            >
              {title}
            </Text>
          )}
          {children}
        </View>
      </Modal>
    );
  },
);

const sheetPadding = 20;
const styles = StyleSheet.create({
  sheetContent: {
    paddingVertical: sheetPadding,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    width: "100%",
  },
  // Optional inset applied to content/title
  sheetInset: {
    paddingHorizontal: sheetPadding,
  },
  sheetModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheetTitle: {
    marginBottom: sheetPadding,
    fontSize: 18,
    fontWeight: "700",
  },
});

export default BottomSheet;
