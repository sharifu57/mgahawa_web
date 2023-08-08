import axios from "axios";
import { BASE_URL } from "../../providers/config";
import { useState } from "react";
import { notification } from "antd";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}categories/`);
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};



export const handleAddtoCart = (product: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  const [api, contextHolder] = notification.useNotification();
  

  if (existingCartItem) {
    const updatesCartItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatesCartItems);
    console.log("____updated product");
    console.log(updatesCartItems);
  } else {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }

  api.success({
    message: "Product added to cart!",
    duration: 3
  });
};
