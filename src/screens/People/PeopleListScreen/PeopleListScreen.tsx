import React, { ReactElement, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// Components
import { DeletePersonDialog } from "@components/dialogs";
import { AppBar, Page } from "@components/layout";
import PeopleList from "./PeopleList";

// Utilities
import { useSnackbar } from "@hooks";
import { addPeople, removePerson, selectPeople } from "@store/slices/people";
import { compareSafeStrings, includesSafeString } from "@utilities/string";

// Types
import { IPerson, IPersonBase } from "@typings/people.types";
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import ManagePersonSheet from "@components/dialogs/ManagePersonSheet";

const PeopleListScreen = (): ReactElement => {
  const [searchText, setSearchText] = useState("");
  const [deletedPerson, setDeletedPerson] = useState<IPerson | null>(null);
  const managePersonRef = useRef<BottomSheetRef>(null);

  const dispatch = useDispatch();
  const { t } = useTranslation(["common", "screens"]);
  const people = useSelector(selectPeople);
  const { notify } = useSnackbar();

  const filteredPeople = searchText.trim()
    ? people.filter((person) => includesSafeString(person.name, searchText))
    : people;

  /**
   * Check if a name is already used (Redux)
   *
   * @param   name - New person's name
   * @returns - Whether name is already used
   */
  const checkIfNameUsed = (name: string): boolean => {
    return people.some((p) => compareSafeStrings(p.name, name));
  };

  /**
   * Prompt for confirmation before deleting a person
   *
   * @param person - Deleted person
   */
  const onPersonDelete = (person: IPerson): void => {
    setDeletedPerson(person);
  };

  /**
   * Cancel deleting a person
   */
  const onPersonDeleteCancel = (): void => {
    setDeletedPerson(null);
  };

  /**
   * Delete a person after confirmation
   */
  const onPersonDeleteConfirm = (): void => {
    if (!deletedPerson) return;

    setDeletedPerson(null);
    dispatch(removePerson(deletedPerson.id));

    notify(
      t("screens:peopleList.deletePersonSuccess", {
        name: deletedPerson.name,
      }),
    );
  };

  /**
   * Cancel adding people
   */
  const onPeopleCancel = (): void => {
    managePersonRef.current?.close();
  };

  /**
   * Add a person/people
   *
   * @param names - List of added names
   */
  const onPeopleSave = (names: string[]): void => {
    const newPeople: IPersonBase[] = names.map((name) => ({
      id: uuidv4(),
      name,
    }));

    dispatch(addPeople(newPeople));

    managePersonRef.current?.close();
    notify(t("screens:peopleAdd.peopleAddSuccess", { count: names.length }));
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
        onRemove={onPersonDelete}
      />
      <FAB
        icon="plus"
        style={styles.peopleFAB}
        onPress={managePersonRef.current?.open}
      />
      <ManagePersonSheet
        ref={managePersonRef}
        checkName={checkIfNameUsed}
        onCancel={onPeopleCancel}
        onSave={onPeopleSave}
      />
      <DeletePersonDialog
        person={deletedPerson}
        visible={Boolean(deletedPerson)}
        onCancel={onPersonDeleteCancel}
        onConfirm={onPersonDeleteConfirm}
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
