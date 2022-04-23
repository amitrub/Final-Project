//useEffect - executes after the component rendered
//useLayoutEffect - run the effect together with rendering the component

import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DetailEventItem from "../../../components/basicComponents/Events/DetailEventItem";
import DateTitle from "../../../components/basicComponents/others/DateTitle";
import Entypo from "react-native-vector-icons/Entypo";
import Loader from "../../../components/basicComponents/others/Loader";
import ErrorScreen, {
  ErrorMessages,
} from "../../../components/basicComponents/others/ErrorScreen";
import Log from "../../../constants/logger";
import UserAuthentication from "../../../global/UserAuthentication";
import { base_url, getEvent, getOrPutSupplier } from "../../../constants/urls";
import {
  createOneButtonAlert,
  createTwoButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../../constants/errorHandler";
import Colors from "../../../constants/colors";
import DatePickerInput from "../../../components/basicComponents/inputs/DatePickerInput";
import IconButton from "../../../components/basicComponents/buttons/IconButton";
import { EditEventEntity } from "../../../Entities/EventEntity";
import fetchTimeout from "fetch-timeout";
import DetailSupplierItem from "../../../components/basicComponents/suppliers/DetailSupplierItem";
import call from "react-native-phone-call";
import { TabNavigator } from "../../../App";

const SupplierPage = (props) => {
  const navigation = props.navigation;
  const params = props.route.params;
  const event_id = params.eventId;
  const supplierId = params.supplierId;
  const myContext = useContext(UserAuthentication);
  const refresh = myContext.refresh;
  const url = base_url + getOrPutSupplier(event_id, supplierId);

  const [supplier, setSupplier] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serviceTypeModalVisible, setServiceTypeModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [editServiceType, setEditServiceType] = useState("");
  const [editPrice, setEditPrice] = useState(0);

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
        console.log(data);
        setSupplier(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("SupplierPage >> getData >> error", err);
      });
  }, [event_id, supplierId]);
  useLayoutEffect(() => {
    setIsLoading(true);
    getData()
      .then((res) => {
        Log.info("SupplierPage >> getData >> success");
        navigation.setOptions({
          headerRight: () => {
            return (
              <View style={styles.rowIcon}>
                <View style={{ paddingLeft: 15 }}>
                  <Entypo
                    name={"edit"}
                    size={20}
                    color={Colors.blueBack}
                    onPress={() =>
                      createOneButtonAlert(
                        "Tap on any of the supplier details to edit it and save it when finished",
                        "Got it",
                        `Edit supplier`
                      )
                    }
                  />
                </View>
              </View>
            );
          },
        });
        setIsLoading(false);
      })
      .catch((error) => Log.Error(error));
  }, [navigation, refresh]);

  const deleteSupplier = async () => {
    Log.info(`SupplierPage >> delete supplier >> url: ${url}`);
    const onPressYes = async () => {
      setIsLoading(true);
      await fetch(
        url,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${myContext.token}`,
          },
        },
        { timeout: 2000 }
      )
        .then(async (res) => {
          Log.info("SupplierPage >> delete supplier >> then");
          // const data = await res.json();
          createOneButtonAlert(
            "The supplier deleted successfully",
            "OK",
            "Delete suppliers",
            () => {
              myContext.setRefresh(!myContext.refresh);
              navigation.pop();
              setIsLoading(false);
            }
          );
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
          Log.error("SupplierPage >> delete supplier >> error", err);
        });
    };
    createTwoButtonAlert(
      "Are you sure you want to delete this supplier?",
      "Yes",
      "No",
      "Delete supplier",
      onPressYes
    );
  };
  const cancelModalButton = (closeModalFunc) => {
    return (
      <Pressable
        style={[styles.button, styles.buttonCancel]}
        onPress={closeModalFunc}
      >
        <Text style={styles.textStyle}>Cancel</Text>
      </Pressable>
    );
  };
  const editServiceTypeModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={serviceTypeModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setServiceTypeModalVisible(!serviceTypeModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit supplier's service type</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEditServiceType}
              value={editServiceType}
            />
            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.buttonUpdate]}
                onPress={() => {
                  let tmpSupplier = supplier;
                  tmpSupplier.job = editServiceType;
                  setSupplier(tmpSupplier);
                  setServiceTypeModalVisible(!serviceTypeModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
              {cancelModalButton(() =>
                setServiceTypeModalVisible(!serviceTypeModalVisible)
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const editPriceModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={priceModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setPriceModalVisible(!priceModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit price</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEditPrice}
              value={editPrice.toString()}
              keyboardType="numeric"
            />
            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.buttonUpdate]}
                onPress={() => {
                  let tmpSupplier = supplier;
                  tmpSupplier.price = editPrice;
                  setSupplier(tmpSupplier);
                  setPriceModalVisible(!priceModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
              {cancelModalButton(() =>
                setPriceModalVisible(!priceModalVisible)
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const nameComponent = () => {
    return (
      <View style={[{ paddingBottom: 20 }, styles.rowTitle]}>
        <View style={{ paddingTop: 12 }}>
          <Entypo
            name={"trash"}
            size={24}
            color={"black"}
            onPress={() => deleteSupplier()}
          />
        </View>
        <Text style={styles.h1}>{supplier.name}</Text>
        <View style={{ paddingTop: 12 }}>
          <Entypo
            name={"phone"}
            size={24}
            color={"black"}
            onPress={() => {
              const args = {
                number: supplier.phone ? supplier.phone : "0528973510", // String value with the number to call
                prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
              };

              call(args).catch(console.error);
            }}
          />
        </View>
      </View>
    );
  };
  const jobComponent = () => {
    return (
      <DetailSupplierItem
        title={"service type"}
        value={supplier.job}
        onPress={() => setServiceTypeModalVisible(!serviceTypeModalVisible)}
      />
    );
  };
  const priceComponent = () => {
    return (
      <DetailSupplierItem
        title={"price"}
        value={`${supplier.price} ₪`}
        onPress={() => setPriceModalVisible(!priceModalVisible)}
      />
    );
  };
  const depositComponent = () => {
    return (
      <DetailSupplierItem
        title={"deposit"}
        value={`0 ₪`}
        onPress={() =>
          createOneButtonAlert("Future feature - not implemented yet")
        }
      />
    );
  };
  const timeComponent = () => {
    return (
      <DetailSupplierItem
        title={"work start time"}
        value={`05/05/2025   18:00`}
        onPress={() =>
          createOneButtonAlert("Future feature - not implemented yet")
        }
      />
    );
  };
  const paymentMethodComponent = () => {
    return (
      <DetailSupplierItem
        title={"payment method"}
        value={"BIT"}
        onPress={() =>
          createOneButtonAlert("Future feature - not implemented yet")
        }
      />
    );
  };
  const savePayIcons = () => {
    return (
      <View style={[styles.row, { marginTop: 20 }]}>
        <IconButton
          onPress={onPay}
          icon={"credit-card"}
          color={Colors.black}
          iconSize={18}
          disabled={supplier.has_paid}
        />
        <IconButton
          onPress={onSaveSupplier}
          icon={"save"}
          color={Colors.black}
          iconSize={18}
        />
      </View>
    );
  };

  const onPay = async () => {
    setIsLoading(true);
    const url = base_url + getOrPutSupplier(event_id, supplierId);
    await fetchTimeout(
      url,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify({ has_paid: true }),
      },
      5000,
      "Timeout"
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = "data.Error";
          createOneButtonAlert(message, "OK", "payment supplier failed");
        } else if (STATUS_SUCCESS(res.status)) {
          // myContext.setRefresh(!myContext.refresh);
          const message = "Payment passed successfully!";
          createOneButtonAlert(message, "OK", "", () => {
            myContext.setRefresh(!myContext.refresh);
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
      });
  };
  const onSaveSupplier = async () => {
    setIsLoading(true);
    const url = base_url + getOrPutSupplier(event_id, supplierId);
    await fetchTimeout(
      url,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${myContext.token}`,
        },
        body: JSON.stringify({ job: supplier.job, price: supplier.price }),
      },
      5000,
      "Timeout"
    )
      .then(async (res) => {
        const data = await res.json();
        if (STATUS_FAILED(res.status)) {
          const message = "data.Error";
          createOneButtonAlert(message, "OK", "EDIT supplier failed");
        } else if (STATUS_SUCCESS(res.status)) {
          // myContext.setRefresh(!myContext.refresh);
          const message = "Supplier updated!";
          createOneButtonAlert(message, "OK", "", () => {
            myContext.setRefresh(!myContext.refresh);
            navigation.pop();
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        Log.error("AddEventOwner >> onSaveEvent >> failed with error: ", err);
      });
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorScreen errorMessage={ErrorMessages.Fetching} />;
  return (
    <View style={styles.screen}>
      {editServiceTypeModal()}
      {editPriceModal()}
      <ScrollView>
        <View style={[styles.screen, styles.screenPadding]}>
          {nameComponent()}
          {jobComponent()}
          {priceComponent()}
          {depositComponent()}
          {timeComponent()}
          {paymentMethodComponent()}
          {savePayIcons()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  screenPadding: {
    paddingTop: "35%",
  },
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25,
    textAlign: "center",
  },
  listItem: {
    backgroundColor: Colors.button_gray,
    borderRadius: 150,
    height: 40,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "center",
  },
  h1: {
    position: "relative",
    padding: 0,
    margin: 0,
    fontFamily: "alef-bold",
    fontWeight: "400",
    fontSize: 32,
    color: Colors.text_black,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: Colors.dark_gray,
  },
  buttonUpdate: {
    backgroundColor: Colors.darkseagreen,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    fontFamily: "alef-regular",
    fontSize: 14,
    height: 40,
    margin: 12,
    padding: 10,
    width: 250,
    backgroundColor: Colors.white,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  row: {
    width: 200,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  rowTitle: {
    width: 320,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  rowIcon: {
    // width: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
});

export default SupplierPage;
