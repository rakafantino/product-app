import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const ProductListItem = ({ data, onPress, bgColor }) => {
  return (
    <View style={styles.productItemOuterContainer}>
      <Pressable android_ripple={{ color: "#cad346" }} onPress={onPress} style={{ ...styles.pressableView, backgroundColor: bgColor }}>
        <View style={styles.productItemInnerContainer}>
          <Image source={{ uri: data.thumbnail }} style={styles.image} />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {data.title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  productItemOuterContainer: {
    flex: 1,
    margin: 5,
    height: 160,
  },
  pressableView: {
    borderRadius: 8,
    paddingBottom: 10,
  },
  productItemInnerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000000",
    padding: 10,
  },
  image: {
    paddingBottom: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: "100%",
    height: 100,
  },
});

export default ProductListItem;
