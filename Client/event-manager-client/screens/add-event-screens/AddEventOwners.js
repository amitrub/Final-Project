import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import ContactItem from "../../components/basicComponents/Events/ContactItem";
import filter from "lodash.filter";
import TextTitle from "../../components/basicComponents/others/TextTitle";
import IconButton from "../../components/basicComponents/buttons/IconButton";
import OwnerEntity from "../../Entities/OwnerEntity";
import Log from "../../constants/logger";
import UserAuthentication from "../../global/UserAuthentication";
import { EditEventEntity } from "../../Entities/EventEntity";
import { AddEventOwnersStyles as styles } from "../../styles/styles";
import { fetchContacts } from "../../api/Contacts/ContactsApi";
import {
  addEventOwnerRequest,
  editEventOwnersRequest,
} from "../../api/EventPage/EventsPageApi";
import { handleError, handleLoading } from "../../validations/validations";
import Loader from "../../components/basicComponents/others/Loader";
import ErrorScreen from "../../components/basicComponents/others/ErrorScreen";

const AddEventOwners = (props) => {
  const params = props.route.params;
  const navigation = props.navigation;
  const myContext = useContext(UserAuthentication);
  const { setIsLoading, isLoading, error } = myContext;
  const [allContacts, setAllContacts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    fetchContacts(myContext, setFullData, setAllContacts);
  }, []);

  async function onSave(newOwners) {
    Log.info("AddEventOwner >> onSaveEvent >> onSave (New event)");
    let event = params.event;
    event.event_owners = newOwners;
    await addEventOwnerRequest(myContext, event, navigation);
  }
  async function onSaveEditEventOwners(newOwners) {
    Log.info("AddEventOwner >> onSaveEvent >> onSaveEditEventOwners");
    let event = params.event;
    let editEvent = new EditEventEntity(
      event.id,
      event.event_manager,
      event.type,
      event.event_name,
      event.date,
      event.budget,
      event.location
    );
    await editEventOwnersRequest(myContext, editEvent, newOwners, navigation);
  }
  const onSaveEvent = useCallback(async () => {
    setIsLoading(true);
    const newOwners = owners.map(
      (ownerContact) =>
        new OwnerEntity(ownerContact.id, ownerContact.name, ownerContact.phone)
    );

    if (params.editMode) {
      await onSaveEditEventOwners(newOwners);
    } else {
      await onSave(newOwners);
    }

    setIsLoading(false);
  }, [owners, navigation]);

  const renderHeader = () => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 40,
          width: 250,
        }}
      >
        <TextInput
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: "#fff" }}
        />
      </View>
    );
  };
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (contact) =>
      contact.name?.includes(formattedQuery)
    );
    setAllContacts(filteredData);
    setQuery(text);
  };
  const onSelectOwner = (contact) => {
    if (contact.isOwner) {
      contact.isOwner = false;
      setOwners(owners.filter((o) => o.id !== contact.id));
    } else {
      contact.isOwner = true;
      setOwners([...owners, contact]);
    }
  };

  // handleLoading();
  // handleError();
  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.ImportContacts} />;

  return (
    <View style={[styles.screen, { paddingTop: "20%" }]}>
      <TextTitle text={"Choose event owners"} />
      {renderHeader()}
      <View
        style={{
          height: "70%",
        }}
      >
        <FlatList
          data={allContacts}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <ContactItem contact={item} onPress={onSelectOwner} />
          )}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <IconButton
          onPress={onSaveEvent}
          icon={"game-controller"}
          color={Colors.black}
          iconSize={18}
        />
      </View>
    </View>
  );
};

export default AddEventOwners;
