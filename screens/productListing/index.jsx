import React, { useContext } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Context } from "../../context";
import ProductListItem from "../../components/productListItem";
import { useNavigation } from "@react-navigation/native";

const ProductListing = () => {
  const { loading, products } = useContext(Context);

  const navigation = useNavigation();

  if (loading) {
    return <ActivityIndicator style={styles.loader} color={"red"} size={"large"} />;
  }

  const handleOnPress = (productId) => {
    navigation.navigate("productDetails", {
      productId,
    });
  };

  return (
    <View>
      <FlatList data={products} renderItem={(itemData) => <ProductListItem data={itemData.item} bgColor={"#d6d3d1"} onPress={() => handleOnPress(itemData.item.id)} />} keyExtractor={(itemData) => itemData.id} numColumns={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductListing;
