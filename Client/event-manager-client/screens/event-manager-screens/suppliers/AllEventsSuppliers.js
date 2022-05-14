import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../../global/UserAuthentication";
import Loader from "../../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../../components/basicComponents/others/ErrorScreen";
import Log from "../../../constants/logger";
import SupplierItem from "../../../components/basicComponents/suppliers/SupplierItem";
import { AllEventsSuppliersStyles as styles } from "../../../styles/styles";
import { fetchEventSuppliers } from "../../../api/Suppliers/AllEventsSuppliersApi";
import { handleError, handleLoading } from "../../../validations/validations";

const AllEventsSuppliers = (props) => {
  const params = props.route.params;
  const navigation = props.navigation;
  const eventId = params.eventId;
  const eventName = params.eventName;
  const myContext = useContext(UserAuthentication);
  const { refresh, isLoading, setIsLoading, error } = myContext;
  const [eventSuppliersData, setEventSuppliersData] = useState([]);

  const getData = useCallback(async () => {
    fetchEventSuppliers(myContext, eventId, setEventSuppliersData);
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    getData()
      .then((res) => res)
      .catch((error) => Log.Error(error));
  }, [eventId, refresh]);
  const body = () => {
    return (
      <ScrollView>
        {eventSuppliersData?.map((supplier, index) => {
          return (
            <SupplierItem key={index} supplier={supplier} eventId={eventId} />
          );
        })}
      </ScrollView>
    );
  };
  const title = () => {
    return (
      <View style={styles.row}>
        <View style={{ paddingBottom: "5%" }}>
          <Text style={styles.mainTitle}>My Suppliers</Text>
          <Text style={styles.textTitle}>{eventName}</Text>
        </View>
        <Entypo
          name="plus"
          size={24}
          onPress={() => {
            navigation.navigate("AddSupplierContact", {
              eventId: eventId,
            });
          }}
        />
      </View>
    );
  };
  // handleLoading();
  // handleError();
  // todo;
  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;

  return (
    <View style={styles.screen}>
      {title()}
      {body()}
    </View>
  );
};

export default AllEventsSuppliers;
