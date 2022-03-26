import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, TextInput } from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import * as Contacts from "expo-contacts";
import ContactItem from "../../components/basicComponents/Events/ContactItem";
import filter from "lodash.filter";
import Loader from "../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorImportContacts,
  ErrorMessages,
} from "../../components/basicComponents/others/ErrorScreen";

const AddEventOwners = (props) => {
  const [allContacts, setAllContacts] = useState([]);
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
            fields: [Contacts.Fields.Emails],
          })
            .then((res) => {
              const { data } = res;
              const mapData = data.map((contact) => contact.name);
              if (data.length > 0) {
                setFullData(mapData);
              }
              setIsLoading(false);
              setAllContacts(mapData);
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

  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.ImportContacts} />;

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 40,
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
  }
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (user) =>
      user?.includes(formattedQuery)
    );
    setAllContacts(filteredData);
    setQuery(text);
  };

  return (
    <View style={styles.screen}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={allContacts}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <ContactItem contact={item} />}
      />
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
