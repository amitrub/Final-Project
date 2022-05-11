import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import * as Contacts from "expo-contacts";
import ContactItem from "../../../components/basicComponents/Events/ContactItem";
import filter from "lodash.filter";
import Loader from "../../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../../components/basicComponents/others/ErrorScreen";
import ContactEntity from "../../../Entities/ContactEntity";
import TextTitle from "../../../components/basicComponents/others/TextTitle";
import IconButton from "../../../components/basicComponents/buttons/IconButton";
import {
  addEventOwner,
  allEvents,
  base_url,
  getEvent,
  getOrPostEventSuppliers,
} from "../../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../../constants/errorHandler";
import Log from "../../../constants/logger";
import UserAuthentication from "../../../global/UserAuthentication";
import { EditEventEntity } from "../../../Entities/EventEntity";
import { AddSupplierContactStyles as styles } from "../../../Styles/styles"

const AddSupplierContact = (props) => {
  const params = props.route.params;
  const eventId = params.eventId;
  const navigation = props.navigation;
  const myContext = useContext(UserAuthentication);

  const [allContacts, setAllContacts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
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

    await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify(event),
      },
        { timeout: 5000 }
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
      await fetch(
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
          { timeout: 5000 }
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

    await fetch(
      urlEditEvent,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify(editEvent),
      },
        { timeout: 5000 }
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
              "Edit suppliers error!",
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

    if (suppliers.length !== 1) {
      return createOneButtonAlert(
        "You can select one contact in each add supplier process",
        "OK",
        "Add new supplier",
        () => setIsLoading(false)
      );
    }

    const supplierToAdd = suppliers[0];
    Log.info("AddSupplier >> onSaveEvent");
    const url = base_url + getOrPostEventSuppliers(eventId);

    await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify({
          name: supplierToAdd.name,
          phone: supplierToAdd.phone,
          job: "Choose supplier job",
          price: 0,
          has_paid: false,
        }),
      },
        { timeout: 5000 }
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          Log.error("AddSupplier >> onSaveEvent >> failed with error: ", data);
          setSuppliers([]);
          const message = "data.Error";
          createOneButtonAlert(message, "OK", "Add supplier contact failed");
        } else if (STATUS_SUCCESS(res.status)) {
          myContext.setRefresh(!myContext.refresh);
          createOneButtonAlert(
            "Contact has been chosen, fill supplier details and save it",
            "Great!",
            "Add supplier",
            () => {
              navigation.pop();
              setIsLoading(false);
              navigation.navigate("SupplierPage", {
                eventId: eventId,
                supplierId: data.id,
              });
            }
          );
        }
      })
      .catch((err) => {
        Log.error("AddSupplier >> onSaveEvent >> failed with error: ", err);
        setSuppliers([]);
        setIsLoading(false);
        setError(err);
      });

    setIsLoading(false);
  }, [suppliers, navigation]);

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
      setSuppliers(suppliers.filter((o) => o.id !== contact.id));
    } else {
      contact.isOwner = true;
      setSuppliers([...suppliers, contact]);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.ImportContacts} />;

  return (
    <View style={[styles.screen, { paddingTop: "20%" }]}>
      <TextTitle text={"Choose contact to be supplier:"} />
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

export default AddSupplierContact;
