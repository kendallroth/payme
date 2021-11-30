import React, { ReactElement, useState } from "react";
import dayjs from "dayjs";
import { name as fakeName } from "faker";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// Components
import { AppBar, Page } from "@components/layout";
import PeopleList from "./PeopleList";

// Utilities
import { useSnackbar } from "@hooks";
import { addPerson, removePerson, selectPeople } from "@store/slices/people";
import { includesSafeString } from "@utilities/string";

// Types
import { IPerson } from "@typings/people.types";

const PeopleListScreen = (): ReactElement => {
  const [searchText, setSearchText] = useState("");

  const { t } = useTranslation(["common", "screens"]);
  const dispatch = useDispatch();
  const people = useSelector(selectPeople);
  const { notifyError } = useSnackbar();

  const filteredPeople = searchText.trim()
    ? people.filter((person) => includesSafeString(person.name, searchText))
    : people;

  /**
   * Add a person
   */
  const onPersonAdd = (): void => {
    const dummyPerson: IPerson = {
      createdAt: dayjs().toISOString(),
      id: uuidv4(),
      name: `${fakeName.firstName()} ${fakeName.lastName()}`,
    };

    dispatch(addPerson(dummyPerson));
  };

  /**
   * Remove a person
   *
   * TODO: Overhaul with new "removal" workflow (this flow is dangerous)!
   *
   * @param personId - Removed person ID
   */
  const onPersonRemove = (personId: string): void => {
    dispatch(removePerson(personId));
  };

  return (
    <Page>
      <AppBar title={t("screens:peopleList.title")} />
      <Searchbar
        placeholder={t("common:phrases.search")}
        style={styles.peopleSearch}
        value={searchText}
        onChangeText={setSearchText}
      />
      <PeopleList
        people={filteredPeople}
        style={styles.peopleList}
        onRemove={onPersonRemove}
      />
      <FAB
        icon="plus"
        style={styles.peopleFAB}
        onPress={(): void => notifyError("Not implemented yet")}
        onLongPress={onPersonAdd}
      />
    </Page>
  );
};

const styles = StyleSheet.create({
  peopleFAB: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
  },
  peopleList: {
    flex: 1,
  },
  peopleSearch: {
    margin: 24,
    marginTop: 8,
  },
});

export default PeopleListScreen;
