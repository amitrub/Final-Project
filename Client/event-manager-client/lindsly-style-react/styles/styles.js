import { StyleSheet } from "react-native";
import Colors from "../../common/constants/colors";

// ------------ MAIN SCREENS -------------

export const HomePageStyles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "700",
  },
});

export const RegisterPageStyles = StyleSheet.create({
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
    padding: 10,
    width: 250,
    backgroundColor: Colors.background_gray,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
});

export const ProfilePageStyles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 26,
    fontStyle: "normal",
    fontWeight: "700",
  },
  secondTitle: {
    color: Colors.dark_gray,
    fontFamily: "alef",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    width: 250,
    backgroundColor: Colors.background_gray,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
});

export const WelcomePageStyles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
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
  // mainTitle: {
  //   color: Colors.text_black,
  //   fontFamily: "alef-bold",
  //   fontSize: 18,
  //   fontStyle: "normal",
  //   fontWeight: "700",
  //   lineHeight: 25,
  //   textAlign: "center",
  // },
  input: {
    height: 45,
    width: "100%",
    backgroundColor: Colors.background_gray,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

// ----------- PREVIEWS ------------

export const MeetingsPreviewStyles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  textTitle: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});

export const EventsPreviewStyles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  textTitle: {
    fontFamily: "alef-regular",
    fontSize: 14,
    textAlign: "left",
  },
});

export const TasksPreviewStyles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
});

// ------------- PAGES --------------

export const AllEventsPageStyles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    height: "99%",
    paddingTop: "15%",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 30,
    width: 500,
    padding: 25,
  },
  textTitle: {
    fontFamily: "alef-regular",
    fontSize: 14,
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

export const EventPageStyles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 30,
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
    width: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  rowButtons: {
    width: 230,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 0,
    margin: 0,
    display: "flex",
    position: "relative",
  },
});

// ----------- ADD-EVENT-SCREENS ------------

export const AddEventDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    paddingBottom: 120,
  },
  screen: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
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
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  input: {
    fontFamily: "alef-regular",
    fontSize: 14,
    height: 40,
    margin: 12,
    padding: 10,
    width: 250,
    backgroundColor: Colors.background_gray,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
});

export const AddEventOwnersStyles = StyleSheet.create({
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

// ---------- SUPPLIERS ------------

export const AddSupplierContactStyles = StyleSheet.create({
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

export const AllEventsSuppliersStyles = StyleSheet.create({
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

export const SupplierPageStyles = StyleSheet.create({
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
    width: 300,
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    display: "flex",
  },
});

// ----------------------------------

export const TasksPageStyles = StyleSheet.create({
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
});

// ----------- EVENT-SCHEDULE ------------

export const EventScheduleStyle = StyleSheet.create({
  timeText: {
    color: Colors.text_black,
    fontFamily: "alef-regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
  },
  nameText: {
    color: Colors.text_black,
    fontFamily: "alef-bold",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
  },
  descriptionText: {
    color: Colors.dark_gray,
    fontFamily: "alef-regular",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
  },
});
