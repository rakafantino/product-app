import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Context } from "../../context";
import FavoriteItem from "../../components/favoriteItem";

const Favorites = () => {
  const { favoriteItems, handleRemoveFavorites } = useContext(Context);

  if (favoriteItems.length === 0) {
    return (
      <View style={styles.noFavorites}>
        <Text style={styles.noFavoritesText}>No Favorites Yet 😔</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList data={favoriteItems} renderItem={(itemData) => <FavoriteItem data={itemData.item} bgColor={"#d6d3d1"} handleRemoveFavorites={handleRemoveFavorites} />} keyExtractor={(itemData) => itemData.id} numColumns={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  noFavorites: {
    padding: 20,
    alignItems: "center",
  },
  noFavoritesText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#020617",
  },
});

export default Favorites;
