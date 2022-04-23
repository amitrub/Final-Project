import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../../constants/colors";
import {
  allEvents,
  base_url,
  getOrPostEventSuppliers,
} from "../../../constants/urls";
import EventEntity from "../../../Entities/EventEntity";
import EventItem from "../../../components/basicComponents/Events/EventItem";
import Entypo from "react-native-vector-icons/Entypo";
import UserAuthentication from "../../../global/UserAuthentication";
import Loader from "../../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../../components/basicComponents/others/ErrorScreen";
import Log from "../../../constants/logger";
import SupplierEntity from "../../../Entities/SupplierEntity";
import SupplierItem from "../../../components/basicComponents/suppliers/SupplierItem";

const AllEventsSuppliers = (props) => {
  const params = props.route.params;
  const navigation = props.navigation;
  const eventId = params.eventId;
  const eventName = params.eventName;
  const myContext = useContext(UserAuthentication);
  const refresh = myContext.refresh;
  const [eventSuppliersData, setEventSuppliersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = base_url + getOrPostEventSuppliers(eventId);

  const getData = useCallback(async () => {
    await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
      },
      { timeout: 2000 }
    )
      .then(async (res) => {
        const data = await res.json();
        const loadedSuppliers = [];
        for (const key in data) {
          loadedSuppliers.push(
            new SupplierEntity(
              data[key].id,
              data[key].name,
              data[key].phone,
              data[key].job,
              data[key].price,
              data[key].has_paid
            )
          );
        }

        setEventSuppliersData(loadedSuppliers);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("AllEventsSuppliers >> getData >> error", err);
      });
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
  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;

  return (
    <View style={styles.screen}>
      {title()}
      {body()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    height: "99%",
    paddingTop: "20%",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 30,
    width: 450,
    padding: 15,
  },
  textTitle: {
    fontFamily: "alef-regular",
    fontSize: 20,
    textAlign: "left",
  },
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },
});

export default AllEventsSuppliers;
