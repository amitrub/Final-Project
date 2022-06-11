import {SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import React, {useCallback, useContext, useLayoutEffect,} from "react";
import Log from "../../constants/logger";
import {ProfilePageStyles} from "../../styles/styles";
import TitleButton from "../../components/basicComponents/buttons/TitleButton";
import UserAuthentication from "../../global/UserAuthentication";
import {editUserRequest, fetchUserDate} from "../../api/UserProfilePage/UserProfilePageApi";
import {useNavigation} from "@react-navigation/native";

const ProfilePage = (props) => {
    const navigation = useNavigation();
    Log.info("User Profile Page >> loading");
    const myContext = useContext(UserAuthentication);
    const {id, setIsLoading} = myContext;
    const [email, setEmail] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [street, setStreet] = React.useState("");
    const [user, setUser] = React.useState({});

    const getData = useCallback(async () => {
        fetchUserDate(myContext, setEmail, setFullName, setPhone, setCountry, setCity, setStreet, setNumber, setUser)
    }, [id]);
    useLayoutEffect(() => {
        setIsLoading(true);
        getData()
            .then((res) => {
                setIsLoading(false);
            })
            .catch((error) => Log.Error(error));
    }, []);

    function createEditFieldsObject() {
        let editUser = {};

        function emailHasEdited() {
            return user.email !== email;
        }

        function nameHasChanged() {
            return user.name !== fullName;
        }

        function phoneHasChanged() {
            return user.phone !== phone;
        }

        function oneOfAddressFieldsHasChanged() {
            return (
                user.address.country !== country ||
                user.address.city !== city ||
                user.address.street !== street ||
                user.address.number.toString() !== number
            );
        }

        if (emailHasEdited()) {
            editUser["email"] = email;
        }
        if (nameHasChanged()) {
            editUser["name"] = fullName;
        }
        if (phoneHasChanged()) {
            editUser["phone"] = phone;
        }
        if (oneOfAddressFieldsHasChanged()) {
            let newAddress = {
                country: country,
                city: city,
                street: street,
                number: number,
            };
            editUser["address"] = newAddress;
        }
        return editUser;
    }

    const onPressSave = async () => {
        let editUser = createEditFieldsObject();
        Log.info("onPressSave >> POST Save");
        console.log(editUser);
        editUserRequest(editUser, navigation, myContext)
            .then((r) => r)
            .catch((e) => console.log(e));
    };

    return (
        <SafeAreaView style={ProfilePageStyles.screen}>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <View
                        style={{
                            marginTop: 15,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={[ProfilePageStyles.mainTitle]}>Profile</Text>
                        <Text style={[ProfilePageStyles.secondTitle]}>{fullName}</Text>
                    </View>
                    <View style={{paddingTop: 40, paddingBottom: 20}}>
                        <TextInput
                            style={ProfilePageStyles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder={"Email address"}
                        />
                        <TextInput
                            style={ProfilePageStyles.input}
                            onChangeText={setFullName}
                            value={fullName}
                            placeholder={"Full Name"}
                        />
                        <TextInput
                            style={ProfilePageStyles.input}
                            onChangeText={setPhone}
                            value={phone}
                            placeholder={"Phone Number"}
                        />
                        <TextInput
                            style={ProfilePageStyles.input}
                            onChangeText={setCountry}
                            value={country}
                            placeholder={"Country"}
                        />
                        <TextInput
                            style={ProfilePageStyles.input}
                            onChangeText={setCity}
                            value={city}
                            placeholder={"City"}
                        />
                        <TextInput
                            style={ProfilePageStyles.input}
                            onChangeText={setStreet}
                            value={street}
                            placeholder={"Street"}
                        />
                        <TextInput
                            style={ProfilePageStyles.input}
                            onChangeText={setNumber}
                            value={number.toString()}
                            placeholder="number"
                            keyboardType="numeric"
                        />
                    </View>
                    <TitleButton text={"Save"} onPress={onPressSave}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfilePage;
