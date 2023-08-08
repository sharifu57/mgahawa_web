import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

import axios from "axios";
import { BASE_URL } from "../../providers/config";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Layout,
  Row,
  Typography,
  notification
} from "antd";
import {
  DownloadOutlined,
  HomeOutlined,
  MinusCircleOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Meta from "antd/es/card/Meta";
import { address } from "../../providers/config";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { primaryColor, secondaryColor } from "../../utilities/colors";
import CategoryNav from "../categories/categories_nav_bar";
const { Text } = Typography;

interface CategoryInt {
  id: number;
  name: string;
}

export default function Cart() {
  const location = useLocation();
  const category = location?.state || null;
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [size, setSize] = useState<SizeType>("small"); // default is 'middle'

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}categories/`);
      if (response.data) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getProducts = async (categoryId: any) => {
    try {
      const response = await axios.get(`${BASE_URL}products/${categoryId}/`);

      if (response?.data) {
        setProducts(response.data);
      }
    } catch (error) {
      return error;
    }
  };

  const handleDecreaseQuantity = (product: any) => {
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: Math.max(p.quantity - 1, 0) };
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  const handleIncreateQuantity = (product: any) => {
    const updatedProducts = products.map((p) => {
      if (p.id == product.id) {
        return { ...p, quantity: Math.max(p.quantity + 1) };
      }
      return p;
    });

    setProducts(updatedProducts);
  };

  const handleAddtoCart = (product: any) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      const updatesCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatesCartItems);
      updateLocalStorage(updatesCartItems);

      console.log("____updated cart");
      console.log(updatesCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      updateLocalStorage(setCartItems);
    }
  };

  const updateLocalStorage = (cartItems: any) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    fetchCategories();
    if (category?.id) {
      getProducts(category.id);
    }
  }, [category]);

  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: "red", width: "100%" }}>
        <CategoryNav categories={categories} />
      </div>

      <div style={{ marginLeft: "11%", marginRight: "12%", marginTop: "20px", marginBottom: "20px" }}>
          <Card>
            one
          </Card>
      </div>

      <div
        style={{ position: "relative", left: "0", bottom: "0", width: "100%" }}
      >
        <Footer />
      </div>
    </div>
  );
}
