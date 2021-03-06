import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import ContactItem from "../../lindsly-style-react/components/eventItems/ContactItem";
import filter from "lodash.filter";
import TextTitle from "../../lindsly-style-react/components/others/TextTitle";
import IconButton from "../../lindsly-style-react/components/buttons/IconButton";
import OwnerEntity from "../../common/Entities/OwnerEntity";
import Log from "../../common/constants/logger";
import UserAuthentication from "../../common/global/UserAuthentication";
import { EditEventEntity } from "../../common/Entities/EventEntity";
import { AddEventOwnersStyles as styles } from "../../lindsly-style-react/styles/styles";
import { fetchContacts } from "../../common/api/Contacts/ContactsApi";
import {
  addEventOwnerRequest,
  editEventOwnersRequest,
} from "../../common/api/EventPage/EventsPageApi";
import Loader from "../../lindsly-style-react/components/others/Loader";
import { createOneButtonAlert } from "../../common/constants/errorHandler";

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
    if (owners.length > 2) {
      createOneButtonAlert(
        "please choose maximum two owners...",
        "OK",
        "Too many owners"
      );
    } else {
      setIsLoading(true);

      const newOwners = owners.map(
        (ownerContact) =>
          new OwnerEntity(
            ownerContact.id,
            ownerContact.name,
            ownerContact.phone
          )
      );

      if (params.editMode) {
        await onSaveEditEventOwners(newOwners);
      } else {
        await onSave(newOwners);
      }

      setIsLoading(false);
    }
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

  if (isLoading) return <Loader />;

  return (
    <View style={[styles.screen, { paddingTop: "20%" }]}>
      <TextTitle text={"Choose event owners"} />
      {renderHeader()}
      <View
        style={{
          height: "75%",
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
          icon={"save"}
          color={Colors.black}
          iconSize={18}
          textButton={"Save"}
        />
      </View>
    </View>
  );
};

export default AddEventOwners;
