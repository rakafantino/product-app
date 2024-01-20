import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProductDetailsItem from "../../components/productDetailsItem";
import { Context } from "../../context";

const ProductDetails = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [productDetailsData, setProductDetailsData] = useState([]);
  const { productId } = route.params;

  useEffect(() => {
    async function getDataFromApi() {
      setLoading(true);
      const api = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await api.json();
      if (data) {
        setLoading(false);
        setProductDetailsData(data);
      }
    }

    getDataFromApi();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.container} color={"red"} size={"large"} />;
  }

  return (
    <View>
      <ProductDetailsItem data={productDetailsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductDetails;
