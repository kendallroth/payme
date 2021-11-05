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

// Utilities
import { colors } from "@theme";

export type BottomSheetProps = {
  /** Modal contents */
  children: ReactElement | ReactElement[];
  /** Whether modal can be closed */
  closable?: boolean;
  /** Modal content style */
  style?: StyleProp<ViewStyle>;
  /** Close callback */
  onClose?: () => void;
};

export type BottomSheetRef = {
  /** Close the modal */
  close: () => void;
  /** Open the modal */
  open: () => void;
  /** Toggle whether the modal is open */
  toggle: () => void;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (props: BottomSheetProps, ref) => {
    const { children, closable = false, style = {}, onClose = null } = props;

    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        close,
        open,
        toggle,
      };
    });

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

    /**
     * Toggle the modal
     */
    const toggle = (): void => {
      setIsOpen(!isOpen);
    };

    return (
      <Modal
        backdropColor={colors.background}
        backdropOpacity={0.8}
        // NOTE: Necessary to fix backdrop flicker bug when closing. If flickering
        //         persists try 'hideModalContentWhileAnimating' as well.
        backdropTransitionOutTiming={0}
        isVisible={isOpen}
        style={[styles.sheetModal]}
        onBackdropPress={close}
        onBackButtonPress={close}
      >
        <View style={[styles.sheetContent, style]}>
          {children}
          {/* {closable && (
          <Pressable style={styles.sheetCloseButton} onPress={close}>
            <Icon color={colors.background} name="close" />
          </Pressable>
        )} */}
        </View>
      </Modal>
    );
  },
);

const sheetColor = "#121212";
const styles = StyleSheet.create({
  sheetCloseButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    marginVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 24,
  },
  sheetContent: {
    paddingVertical: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: sheetColor,
    width: "100%",
  },
  sheetModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

export default BottomSheet;
