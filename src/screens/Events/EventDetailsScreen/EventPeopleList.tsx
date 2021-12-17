import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { Checkbox, List, useTheme } from "react-native-paper";

// Components
import { Alert } from "@components/typography";

// Utilities
import { flatListIdExtractor } from "@utilities/list.util";

// Types
import { IPerson } from "@typings/people.types";

type EventAttendanceListProps = {
  /** List of people */
  people: IPerson[];
};

// TODO: Handle selecting people for attendance!

const EventAttendanceList = (props: EventAttendanceListProps): ReactElement => {
  const { people } = props;

  const { t } = useTranslation(["common"]);
  const { colors } = useTheme();

  const renderPersonItem = ({
    item,
  }: ListRenderItemInfo<IPerson>): ReactElement => (
    <List.Item
      key={item.id}
      left={(leftProps): ReactElement => (
        <Checkbox.Android
          {...leftProps}
          color={colors.primary}
          disabled={false}
          status={"unchecked"}
          onPress={() => {}}
        />
      )}
      title={item.name}
      onPress={() => {}}
    />
  );

  // TODO: Render something else (big image) when no people have been added!

  return (
    <FlatList
      data={people}
      keyExtractor={flatListIdExtractor}
      ListEmptyComponent={(): ReactElement => (
        <Alert style={styles.listEmpty}>
          {t("common:errors.noMatchingPeople")}
        </Alert>
      )}
      renderItem={renderPersonItem}
      style={[styles.list]}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listEmpty: {
    marginHorizontal: 24,
  },
});

export default EventAttendanceList;
