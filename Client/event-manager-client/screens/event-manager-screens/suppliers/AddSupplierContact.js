import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import ContactItem from "../../../components/basicComponents/Events/ContactItem";
import filter from "lodash.filter";
import Loader from "../../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../../components/basicComponents/others/ErrorScreen";
import TextTitle from "../../../components/basicComponents/others/TextTitle";
import IconButton from "../../../components/basicComponents/buttons/IconButton";
import {
  createOneButtonAlert,
} from "../../../constants/errorHandler";
import Log from "../../../constants/logger";
import UserAuthentication from "../../../global/UserAuthentication";
import { AddSupplierContactStyles as styles } from "../../../Styles/styles"
import {saveNewSupplierRequest} from "../../../api/Suppliers/AddSupplierContactApi";
import {fetchContacts} from "../../../api/Contacts/ContactsApi";

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
      fetchContacts(myContext, setFullData, setAllContacts)
  }, []);

  const onSaveSupplier = useCallback(async () => {
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
    Log.info("AddSupplier >> onSaveSupplier");
    saveNewSupplierRequest(myContext, supplierToAdd, eventId, setSuppliers, navigation)
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
          onPress={onSaveSupplier}
          icon={"game-controller"}
          color={Colors.black}
          iconSize={18}
        />
      </View>
    </View>
  );
};

export default AddSupplierContact;
