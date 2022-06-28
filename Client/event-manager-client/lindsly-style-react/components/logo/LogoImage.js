import React from "react";
import { View, StyleSheet, Image } from "react-native";

const LogoImage = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../../../common/assets/images/cheers.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default LogoImage;
