//create the context
//provide the context
// consume that context

import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ProductContext = ({ children }) => {
  //list of products
  const [products, setProducts] = useState([]);

  //loading state
  const [loading, setLoading] = useState(false);

  //favorite
  const [favoriteItems, setFavoriteItems] = useState([]);

  // add favorite
  const addToFavorites = (id) => {
    const copyFavoriteItems = [...favoriteItems];
    const index = copyFavoriteItems.findIndex((item) => item.id === id);
    if (index === -1) {
      const getCurrentProductItems = products.find((item) => item.id === id);
      copyFavoriteItems.push({
        title: getCurrentProductItems.title,
        thumbnail: getCurrentProductItems.thumbnail,
        id,
      });
    }
    setFavoriteItems(copyFavoriteItems);
  };

  //remove favorite
  const handleRemoveFavorites = (id) => {
    const copyFavoriteItems = [...favoriteItems];
    const removeItem = copyFavoriteItems.filter((item) => item.id !== id);
    setFavoriteItems(removeItem);
  };

  useEffect(() => {
    setLoading(true);
    async function getProductsFromApi() {
      const api = await fetch("https://dummyjson.com/products");
      const res = await api.json();
      if (res) {
        setLoading(false);
        setProducts(res.products);
      }
    }

    getProductsFromApi();
  }, []);

  return <Context.Provider value={{ products, loading, addToFavorites, handleRemoveFavorites, favoriteItems }}>{children}</Context.Provider>;
};

export default ProductContext;
