import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { IconButton, List, Text, useTheme } from "react-native-paper";

// Utilities
import { flatListIdExtractor } from "@utilities/list.util";

// Types
import { IPerson } from "@typings/people.types";

type PeopleProps = {
  /** List of people */
  people: IPerson[];
  /** List container style */
  style?: StyleProp<ViewStyle>;
  /** Person removal handler */
  onRemove: (person: IPerson) => void;
};

const PeopleList = (props: PeopleProps): ReactElement => {
  const { people, style, onRemove } = props;

  const { t } = useTranslation(["common"]);
  const { colors } = useTheme();

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
    <IconButton
      {...rightProps}
      icon="package-down"
      onPress={(): void => onRemove(item)}
    />
  );

  return (
    <FlatList
      data={people}
      keyExtractor={flatListIdExtractor}
      ListEmptyComponent={(): ReactElement => (
        <Text style={styles.listEmpty}>
          {t("common:errors.noMatchingPeople")}
        </Text>
      )}
      renderItem={renderPersonItem}
      style={[styles.list, style]}
    />
  );
};

const styles = StyleSheet.create({
  list: {},
  listEmpty: {
    marginHorizontal: 24,
  },
});

export default PeopleList;
