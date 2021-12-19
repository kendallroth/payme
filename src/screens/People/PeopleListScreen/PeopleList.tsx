import React, { ReactElement, RefObject } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { IconButton, List } from "react-native-paper";

// Components
import { Alert } from "@components/typography";

// Utilities
import { flatListIdExtractor } from "@utilities/list.util";

// Types
import { ScrollEvent } from "@typings/app.types";
import { IPerson } from "@typings/people.types";

type PeopleProps = {
  innerRef?: RefObject<FlatList>;
  /** List of people */
  people: IPerson[];
  /** List container style */
  style?: StyleProp<ViewStyle>;
  /** Person edit handler */
  onEdit: (person: IPerson) => void;
  /** Person removal handler */
  onRemove: (person: IPerson) => void;
  /** Scroll handler */
  onScroll?: (event: ScrollEvent) => void;
};

const PeopleList = (props: PeopleProps): ReactElement => {
  const { innerRef, people, style, onEdit, onRemove, onScroll } = props;

  const { t } = useTranslation(["common"]);

  const renderPersonItem = ({
    item,
  }: ListRenderItemInfo<IPerson>): ReactElement => (
    <List.Item
      key={item.id}
      right={(rightProps): ReactElement =>
        renderPersonItemRight(rightProps, item)
      }
      title={item.name}
    />
  );

  const renderPersonItemRight = (
    rightProps: any,
    item: IPerson,
  ): ReactElement => (
    <View {...rightProps} style={styles.listItemActions}>
      <IconButton
        {...rightProps}
        icon="pencil"
        onPress={(): void => onEdit(item)}
      />
      <IconButton
        {...rightProps}
        icon="delete"
        onPress={(): void => onRemove(item)}
      />
    </View>
  );

  // TODO: Render something else (big image) when no people have been added!

  return (
    <FlatList
      ref={innerRef}
      data={people}
      keyExtractor={flatListIdExtractor}
      ListEmptyComponent={(): ReactElement => (
        <Alert style={styles.listEmpty}>
          {t("common:errors.noMatchingPeople")}
        </Alert>
      )}
      renderItem={renderPersonItem}
      style={[styles.list, style]}
      onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  list: {},
  listEmpty: {
    marginHorizontal: 24,
  },
  listItemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PeopleList;
