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
import {
  addEventOwner,
  allEvents,
  base_url,
  getEvent,
} from "../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import Log from "../../constants/logger";
import UserAuthentication from "../../global/UserAuthentication";
import { EditEventEntity } from "../../Entities/EventEntity";

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
              setAllContacts(contacts);

              // debugger;
              // const paramsOwners = params.event.event_owners;
              // if (paramsOwners && paramsOwners.length > 0) {
              //   let contactOwners = paramsOwners.map(
              //     (po) => new ContactEntity(po.id, po.name, po.phone, true)
              //   );
              //   setOwners(contactOwners);
              //   const ownersIds = contactOwners.map((o) => o.id);
              //   let updatedContactOwners = allContacts.map((c) => {
              //     if (ownersIds.includes(c.id)) {
              //       return new ContactEntity(c.id, c.name, c.phone, true);
              //     } else {
              //       return c;
              //     }
              //   });
              //   setAllContacts(updatedContactOwners);
              // }
              setIsLoading(false);
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

  async function onSave(newOwners) {
    Log.info("AddEventOwner >> onSaveEvent >> onSave (New event)");
    let event = params.event;
    event.event_owners = newOwners;
    const url = base_url + allEvents;

    await fetchTimeout(
      url,
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
          myContext.setRefresh(!myContext.refresh);
          const message =
            "The event was added successfully! \nGo watch your events";
          createOneButtonAlert(message, "OK", "ADD NEW EVENT", () =>
            navigation.navigate("AllEvents")
          );
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
      });
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
    const urlEditEvent = base_url + getEvent(event.id);
    const urlEditOwnerEvent = base_url + addEventOwner(event.id);
    async function addNewOwnerRequest(owner) {
      console.log(urlEditOwnerEvent);
      console.log(owner.name);
      console.log(owner.phone);

      await fetchTimeout(
        urlEditOwnerEvent,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myContext.token}`,
          },
          body: JSON.stringify({
            name: owner.name,
            phone: owner.phone,
          }),
        },
        5000,
        "Timeout"
      )
        .then(async (res) => {
          const data = await res.json();
          if (STATUS_FAILED(res.status)) {
            const message = data.toString();
            createOneButtonAlert(message, "OK", "add New Owner Request failed");
            return false;
          } else if (STATUS_SUCCESS(res.status)) {
            return true;
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
          Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
          return false;
        });
    }

    await fetchTimeout(
      urlEditEvent,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify(editEvent),
      },
      5000,
      "Timeout"
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = "data.Error";
          createOneButtonAlert(message, "OK", "EDIT event failed");
        } else if (STATUS_SUCCESS(res.status)) {
          let ownersSucceeded = true;
          for (const owner of newOwners) {
            if (!ownersSucceeded) break;
            addNewOwnerRequest(owner).then((res) => {
              ownersSucceeded = ownersSucceeded && !!res;
            });
          }

          //----------------------------------------------------------
          if (ownersSucceeded) {
            myContext.setRefresh(!myContext.refresh);
            const message = "Owners updated!";
            createOneButtonAlert(message, "OK", "", () => navigation.pop());
          } else {
            createOneButtonAlert(
              "Owners didn't updated successfully!",
              "OK",
              "Edit owners error!",
              () => navigation.pop()
            );
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
      });
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

  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.ImportContacts} />;

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
