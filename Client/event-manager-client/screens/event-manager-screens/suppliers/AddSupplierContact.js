import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import ContactItem from "../../../lindsly-style-react/components/eventItems/ContactItem";
import filter from "lodash.filter";
import Loader from "../../../lindsly-style-react/components/others/Loader";
import TextTitle from "../../../lindsly-style-react/components/others/TextTitle";
import IconButton from "../../../lindsly-style-react/components/buttons/IconButton";
import { createOneButtonAlert } from "../../../common/constants/errorHandler";
import Log from "../../../common/constants/logger";
import UserAuthentication from "../../../common/global/UserAuthentication";
import { AddSupplierContactStyles as styles } from "../../../lindsly-style-react/styles/styles";
import { saveNewSupplierRequest } from "../../../common/api/Suppliers/AddSupplierContactApi";
import { fetchContacts } from "../../../common/api/Contacts/ContactsApi";

const AddSupplierContact = (props) => {
  const params = props.route.params;
  const eventId = params.eventId;
  const navigation = props.navigation;
  const myContext = useContext(UserAuthentication);
  const { isLoading, setIsLoading, error } = myContext;
  const [allContacts, setAllContacts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    fetchContacts(myContext, setFullData, setAllContacts);
  }, []);

  const onSaveSupplier = useCallback(async () => {
    Log.info("AddSupplier >> onSaveSupplier");

    if (suppliers.length !== 1) {
      return createOneButtonAlert(
        "Please select one contact only",
        "OK",
        "Failed ...",
        () => setIsLoading(false)
      );
    }

    setIsLoading(true);
    const supplierToAdd = suppliers[0];
    await saveNewSupplierRequest(
      myContext,
      supplierToAdd,
      eventId,
      setSuppliers,
      navigation
    );
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

  return (
    <View style={[styles.screen, { paddingTop: "20%" }]}>
      <TextTitle text={"Choose supplier:"} />
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
      <View style={{ marginTop: 40 }}>
        <IconButton
          onPress={onSaveSupplier}
          icon={"chevron-thin-right"}
          color={Colors.black}
          iconSize={16}
        />
      </View>
    </View>
  );
};

export default AddSupplierContact;
