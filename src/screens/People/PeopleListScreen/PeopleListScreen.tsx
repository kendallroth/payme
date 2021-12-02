import React, { ReactElement, useState } from "react";
import dayjs from "dayjs";
import { name as fakeName } from "faker";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// Components
import { ArchivePersonDialog } from "@components/dialogs";
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
  const [archivedPerson, setArchivedPerson] = useState<IPerson | null>(null);

  const dispatch = useDispatch();
  const { t } = useTranslation(["common", "screens"]);
  const people = useSelector(selectPeople);
  const { notify, notifyError } = useSnackbar();

  const filteredPeople = searchText.trim()
    ? people.filter((person) => includesSafeString(person.name, searchText))
    : people;

  /**
   * Add a person
   */
  const onPersonAdd = (): void => {
    const dummyPerson: IPerson = {
      archivedAt: null,
      createdAt: dayjs().toISOString(),
      id: uuidv4(),
      name: `${fakeName.firstName()} ${fakeName.lastName()}`,
    };

    dispatch(addPerson(dummyPerson));
  };

  /**
   * Prompt for confirmation before archiving a person
   *
   * @param person - Archived person
   */
  const onPersonArchive = (person: IPerson): void => {
    setArchivedPerson(person);
  };

  /**
   * Cancel archiving a person
   */
  const onPersonArchiveCancel = (): void => {
    setArchivedPerson(null);
  };

  /**
   * Archive a person after confirmation
   */
  const onPersonArchiveConfirm = (): void => {
    if (!archivedPerson) return;

    setArchivedPerson(null);
    dispatch(removePerson(archivedPerson.id));

    notify(
      t("screens:peopleList.archivePersonSuccess", {
        name: archivedPerson.name,
      }),
    );
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
        onRemove={onPersonArchive}
      />
      <FAB
        icon="plus"
        style={styles.peopleFAB}
        onPress={(): void => notifyError("Not implemented yet")}
        onLongPress={onPersonAdd}
      />
      <ArchivePersonDialog
        person={archivedPerson}
        visible={Boolean(archivedPerson)}
        onCancel={onPersonArchiveCancel}
        onConfirm={onPersonArchiveConfirm}
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
