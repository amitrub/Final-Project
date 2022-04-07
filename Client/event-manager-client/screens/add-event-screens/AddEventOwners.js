import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import * as Contacts from "expo-contacts";
import ContactItem from "../../components/basicComponents/Events/ContactItem";
import filter from "lodash.filter";
import Loader from "../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../components/basicComponents/others/ErrorScreen";
import ContactEntity from "../../Entities/ContactEntity";
import TextTitle from "../../components/basicComponents/others/TextTitle";
import IconButton from "../../components/basicComponents/buttons/IconButton";
import OwnerEntity from "../../Entities/OwnerEntity";
import fetchTimeout from "fetch-timeout";
import { allEvents, base_url } from "../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import Log from "../../constants/logger";
import UserAuthentication from "../../global/UserAuthentication";

const AddEventOwners = (props) => {
  const params = props.route.params;
  const navigation = props.navigation;
  const myContext = useContext(UserAuthentication);
  const [allContacts, setAllContacts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    Contacts.requestPermissionsAsync()
      .then((res) => {
        const { status } = res;
        if (status === "granted") {
          Contacts.getContactsAsync({
            // fields: [Contacts.Fields.Emails],
          })
            .then((res) => {
              const { data } = res;
              const contacts = data.map((c) => {
                const name = c.name
                  ? c.name
                  : c.firstName
                  ? c.firstName
                  : "no name";
                const phone = c.phoneNumbers ? c.phoneNumbers[0].number : "";
                return new ContactEntity(c.id, name, phone);
              });
              if (data.length > 0) {
                setFullData(contacts);
              }
              setIsLoading(false);
              setAllContacts(contacts);
            })
            .catch((err) => {
              setIsLoading(false);
              setError(err);
            });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);
  const onSaveEvent = useCallback(async () => {
    Log.info("AddEventOwner >> onSaveEvent");
    let event = params.event;
    event.event_owners = owners.map(
      (ownerContact) =>
        new OwnerEntity(ownerContact.id, ownerContact.name, ownerContact.phone)
    );

    setIsLoading(true);

    await fetchTimeout(
      base_url + allEvents,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify(event),
      },
      5000,
      "Timeout"
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = "data.Error";
          createOneButtonAlert(message, "OK", "Add new event failed");
        } else if (STATUS_SUCCESS(res.status)) {
          const message =
            "The event was added successfully! \nGo watch your events";
          myContext.setRefresh(!myContext.refresh);
          createOneButtonAlert(message, "OK", "ADD NEW EVENT", () =>
            navigation.navigate("AllEvents")
          );
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("AddEventOwner >> onSaveEvent error", err);
      });
  }, [owners, navigation]);
  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.ImportContacts} />;
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

  return (
    <View style={styles.screen}>
      <TextTitle text={"Choose event owners"} />
      {renderHeader()}
      <View
        style={{
          height: "70%",
        }}
      >
        <FlatList
          // ListHeaderComponent={renderHeader}
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

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  listItemText: {
    fontSize: 18,
  },
});

export default AddEventOwners;
