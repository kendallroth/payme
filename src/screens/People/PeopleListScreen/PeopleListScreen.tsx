import React, { ReactElement, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

// Components
import { DeletePersonDialog, ManagePersonSheet } from "@components/dialogs";
import { AppBar, Page, ScreenFAB } from "@components/layout";
import PeopleList from "./PeopleList";

// Utilities
import { useAppDispatch, useAppSelector, useSnackbar } from "@hooks";
import {
  addPeople,
  removePerson,
  selectPeople,
  updatePerson,
} from "@store/slices/people";
import { compareSafeStrings, includesSafeString } from "@utilities/string";

// Types
import { BottomSheetRef } from "@components/dialogs/BottomSheet";
import { IPerson, IPersonBase } from "@typings/people.types";

const PeopleListScreen = (): ReactElement => {
  const [searchText, setSearchText] = useState("");
  const [editedPerson, setEditedPerson] = useState<IPerson | null>(null);
  const [deletedPerson, setDeletedPerson] = useState<IPerson | null>(null);
  const managePersonRef = useRef<BottomSheetRef>(null);

  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeople);
  const { notify } = useSnackbar();
  const { t } = useTranslation(["common", "screens"]);

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
  const onPersonDeletePress = (person: IPerson): void => {
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
   * Display a person for editing
   *
   * @param person - Edited person
   */
  const onPersonEditPress = (person: IPerson): void => {
    setEditedPerson(person);
    managePersonRef.current?.open();
  };

  /**
   * Add a person/people
   *
   * @param newPeople - List of added people
   */
  const onPeopleManageAdd = (newPeople: IPersonBase[]): void => {
    dispatch(addPeople(newPeople));

    managePersonRef.current?.close();
    notify(
      t("screens:peopleAddEdit.peopleAddSuccess", { count: newPeople.length }),
    );
  };

  /**
   * Cancel adding/updating people
   */
  const onPeopleManageCancel = (): void => {
    managePersonRef.current?.close();
    setEditedPerson(null);
  };

  /**
   * Save an edited person
   *
   * @param person - Edited person
   */
  const onPeopleManageEdit = (person: IPerson): void => {
    dispatch(updatePerson(person));

    setEditedPerson(null);
    managePersonRef.current?.close();
    notify(t("screens:peopleAddEdit.personEditSuccess", { name: person.name }));
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
        onEdit={onPersonEditPress}
        onRemove={onPersonDeletePress}
      />
      <ScreenFAB
        icon="account-plus"
        onPress={(): void => managePersonRef.current?.open()}
      />
      <ManagePersonSheet
        ref={managePersonRef}
        checkName={checkIfNameUsed}
        person={editedPerson}
        onAdd={onPeopleManageAdd}
        onCancel={onPeopleManageCancel}
        onEdit={onPeopleManageEdit}
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
  peopleList: {
    flex: 1,
  },
  peopleSearch: {
    margin: 24,
    marginTop: 8,
  },
});

export default PeopleListScreen;
