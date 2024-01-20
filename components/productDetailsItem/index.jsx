import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Button, Modal } from "react-native";
import { useState } from "react";
import { Context } from "../../context";
import { useNavigation } from "@react-navigation/native";

const ProductDetailsItem = ({ data }) => {
  const [isFavoriteModalVisible, setIsFavoriteModalVisible] = useState(false);
  const { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = data;

  const { addToFavorites, favoriteItems } = useContext(Context);

  const navigate = useNavigation();

  const isCurrentItemIsPresentInFavoriteArray = favoriteItems && favoriteItems.length > 0 ? favoriteItems.filter((item) => item.id === id) : false;

  const toggleFavoriteModal = () => {
    addToFavorites(id);
    setIsFavoriteModalVisible(!isFavoriteModalVisible);
  };

  const getPriceWithDiscount = () => {
    const priceAfterDiscount = price - (price * discountPercentage) / 100;
    return priceAfterDiscount.toFixed(2);
  };

  const handleGoToFavorites = () => {
    navigate.navigate("favorites");
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>Brand: {brand}</Text>
          <Text style={styles.text}>Category: {category}</Text>
          <Text style={styles.text}>Rating: {rating}</Text>
          <Text style={styles.text}>Stock: {stock}</Text>
          <Text style={styles.text}>Description: {description}</Text>
          <Text style={styles.priceText}>Price: ${getPriceWithDiscount()}</Text>
          <Text style={styles.text}>Discount {discountPercentage > 0 && <Text style={styles.discountText}>{discountPercentage}% off</Text>}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {isCurrentItemIsPresentInFavoriteArray && isCurrentItemIsPresentInFavoriteArray.length > 0 ? (
            <Button title="Go To Favorites" color="#8b5cf6" onPress={handleGoToFavorites} />
          ) : (
            <Button title="Add To Favorite" color="#8b5cf6" onPress={toggleFavoriteModal} />
          )}
        </View>
      </View>
      {isFavoriteModalVisible && (
        <Modal animationType="slide" transparent={true} visible={isFavoriteModalVisible} onRequestClose={toggleFavoriteModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Successfully added to favorite!</Text>
              <Button title="OK" color="#8b5cf6" onPress={toggleFavoriteModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  details: {
    height: "70%",
    backgroundColor: "#e5e7eb",
    borderColor: "#111827",
    borderWidth: 1,
    padding: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#020617",
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
    color: "#020617",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  discountText: {
    color: "#dc2626",
    marginLeft: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // background color for the overlay
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "80%", // set a width for the modal
    height: "20%",
  },
  modalText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ProductDetailsItem;
