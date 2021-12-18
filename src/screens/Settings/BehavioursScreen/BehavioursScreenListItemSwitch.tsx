import React, { ReactElement } from "react";
import { List, Switch } from "react-native-paper";

// Types
import { IAppBehaviours } from "@typings/settings.types";

type BehavioursScreenListItemSwitchProps = {
  /** Switch description */
  description?: string;
  /** Behaviour state key */
  stateKey: keyof IAppBehaviours;
  /** Switch title */
  title: string;
  /** Switch value */
  value: boolean;
  /** Change handler */
  onChange: (behaviourKey: keyof IAppBehaviours, value: boolean) => void;
};

const BehavioursScreenListItemSwitch = (
  props: BehavioursScreenListItemSwitchProps,
): ReactElement => {
  const { description, stateKey, title, value, onChange } = props;

  return (
    <List.Item
      description={description}
      right={(): ReactElement => (
        <Switch
          value={value}
          onValueChange={(val: boolean): void => onChange(stateKey, val)}
        />
      )}
      title={title}
    />
  );
};

export default BehavioursScreenListItemSwitch;
