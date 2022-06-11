//useEffect - executes after the component rendered
//useLayoutEffect - run the effect together with rendering the component

import React, {useCallback, useContext, useLayoutEffect, useState,} from "react";
import {Alert, Linking, Modal, Pressable, ScrollView, Text, TextInput, View,} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Loader from "../../../components/basicComponents/others/Loader";
import Log from "../../../constants/logger";
import UserAuthentication from "../../../global/UserAuthentication";
import {createOneButtonAlert,} from "../../../constants/errorHandler";
import Colors from "../../../constants/colors";
import IconButton from "../../../components/basicComponents/buttons/IconButton";
import DetailSupplierItem from "../../../components/basicComponents/suppliers/DetailSupplierItem";
import call from "react-native-phone-call";
import {SupplierPageStyles as styles} from "../../../styles/styles";
import {
    deleteSupplierRequest,
    fetchSupplierDataRequest,
    payToSupplierRequest,
    saveSupplierRequest
} from "../../../api/Suppliers/SupplierActionsApi";

const SupplierPage = (props) => {
    const navigation = props.navigation;
    const params = props.route.params;
    const event_id = params.eventId;
    const supplierId = params.supplierId;
    const isAddSupplier = params.isAddSupplier;
    const myContext = useContext(UserAuthentication);
    const {refresh, isLoading, setIsLoading} = myContext;
    const [supplier, setSupplier] = useState({});
    const [serviceTypeModalVisible, setServiceTypeModalVisible] = useState(false);
    const [priceModalVisible, setPriceModalVisible] = useState(false);
    const [editServiceType, setEditServiceType] = useState("");
    const [editPrice, setEditPrice] = useState(0);

    const getData = useCallback(async () => {
        fetchSupplierDataRequest(myContext,
            event_id,
            supplierId,
            setSupplier)
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
                                <View style={{paddingLeft: 15}}>
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
            <View style={[{paddingBottom: 10}]}>
                <Text style={styles.h1}>{supplier.name}</Text>
            </View>
        );
    };
    const callComponent = () => {
        return (
            <IconButton
                onPress={() => {
                    const args = {
                        number: supplier.phone ? supplier.phone : "0528973510", // String value with the number to call
                        prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
                    };

                    call(args).catch(console.error);
                }}
                icon={"phone"}
                color={Colors.black}
                iconSize={16}
                textButton={"Call"}
            />
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
                disabled={supplier.has_paid}
                onPress={() => setPriceModalVisible(!priceModalVisible)}
            />
        );
    };
    const depositComponent = () => {
        return (
            <DetailSupplierItem
                title={"deposit"}
                value={`0 ₪`}
                disabled={supplier.has_paid}
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

    const savePayIcons = () => {
        return !isAddSupplier ? (
            <View style={styles.screen}>
                <View style={[styles.row, {marginTop: 20}]}>
                    <IconButton
                        onPress={() => saveSupplierRequest(myContext,
                            event_id,
                            supplierId,
                            supplier,
                            navigation)}
                        icon={"save"}
                        color={Colors.black}
                        iconSize={18}
                        textButton={"Save"}
                    />
                    <IconButton
                        onPress={() => {
                            deleteSupplierRequest(myContext,
                                event_id,
                                supplierId,
                                navigation)
                        }}
                        icon={"trash"}
                        color={Colors.black}
                        iconSize={18}
                        textButton={"Delete"}
                    />
                    <IconButton
                        onPress={onPressBit}
                        icon={"credit"}
                        color={Colors.black}
                        iconSize={16}
                        textButton={"Bit"}
                    />
                </View>
                <View>
                    <IconButton
                        onPress={() => {
                            payToSupplierRequest(myContext,
                                event_id,
                                supplierId,
                                navigation)
                        }}
                        icon={"credit-card"}
                        color={Colors.black}
                        iconSize={18}
                        disabled={supplier.has_paid}
                        textButton={supplier.has_paid ? "Paid!" : "Mark as paid"}
                        width={300}
                    />
                </View>
            </View>
        ) : (
            <View>
                <IconButton
                    onPress={() => saveSupplierRequest(myContext,
                        event_id,
                        supplierId,
                        supplier,
                        navigation)}
                    icon={"save"}
                    color={Colors.black}
                    iconSize={18}
                    textButton={"Save"}
                />
            </View>
        );
    };

    const bitUrl = "https://bitpay.co.il/app/";
    const onPressBit = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        console.log(bitUrl);
        const supported = await Linking.canOpenURL(bitUrl);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(bitUrl);
        } else {
            Alert.alert(`Don't know how to open this URL: ${bitUrl}`);
        }
    }, [bitUrl]);

    if (isLoading) return <Loader/>;

    return (
        <View style={styles.screen}>
            {editServiceTypeModal()}
            {editPriceModal()}
            <ScrollView>
                <View style={[styles.screen, styles.screenPadding]}>
                    {nameComponent()}
                    {callComponent()}
                    {jobComponent()}
                    {priceComponent()}
                    {depositComponent()}
                    {timeComponent()}
                    {savePayIcons()}
                </View>
            </ScrollView>
        </View>
    );
};

export default SupplierPage;
