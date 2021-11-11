import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";

type DeveloperListItemProps = {
  /** Item title */
  title: string;
  /** Item value */
  value: string;
};

const DeveloperListItem = (props: DeveloperListItemProps): ReactElement => {
  const { title, value } = props;

  return (
    <List.Item
      title={title}
      right={(rightProps: any): ReactElement => (
        <Text {...rightProps}>{value}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default DeveloperListItem;
